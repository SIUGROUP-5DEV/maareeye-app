import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:crypto/crypto.dart';
import 'dart:convert';

import '../models/user_model.dart';
import '../../../core/services/storage_service.dart';
import '../../../core/services/biometric_service.dart';
import '../../../core/config/app_config.dart';

class AuthProvider extends ChangeNotifier {
  final SupabaseClient _supabase = Supabase.instance.client;
  
  UserModel? _user;
  bool _isLoading = false;
  String? _error;

  UserModel? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;

  AuthProvider() {
    _loadUserFromStorage();
  }

  Future<void> _loadUserFromStorage() async {
    await StorageService.init();
    final userData = StorageService.getObject(AppConfig.userDataKey);
    if (userData != null) {
      _user = UserModel.fromJson(userData);
      notifyListeners();
    }
  }

  String _hashPassword(String password) {
    final bytes = utf8.encode(password);
    final digest = sha256.convert(bytes);
    return digest.toString();
  }

  Future<bool> register({
    required String firstName,
    required String lastName,
    required String email,
    required String password,
  }) async {
    try {
      _setLoading(true);
      _setError(null);

      // Create user in Supabase Auth
      final response = await _supabase.auth.signUp(
        email: email,
        password: password,
      );

      if (response.user != null) {
        // Create user profile in database
        final userModel = UserModel(
          id: response.user!.id,
          email: email,
          firstName: firstName,
          lastName: lastName,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        );

        await _supabase.from('users').insert(userModel.toJson());
        
        return true;
      }
      return false;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> login({
    required String email,
    required String password,
    bool useBiometric = false,
  }) async {
    try {
      _setLoading(true);
      _setError(null);

      if (useBiometric) {
        final authenticated = await BiometricService.authenticate(
          reason: 'Authenticate to access your account',
        );
        if (!authenticated) {
          _setError('Biometric authentication failed');
          return false;
        }
      }

      final response = await _supabase.auth.signInWithPassword(
        email: email,
        password: password,
      );

      if (response.user != null) {
        // Fetch user profile
        final userResponse = await _supabase
            .from('users')
            .select()
            .eq('id', response.user!.id)
            .single();

        _user = UserModel.fromJson(userResponse);
        await StorageService.setObject(AppConfig.userDataKey, _user!.toJson());
        
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> verifyEmail(String email, String code) async {
    try {
      _setLoading(true);
      _setError(null);

      final response = await _supabase.auth.verifyOTP(
        email: email,
        token: code,
        type: OtpType.signup,
      );

      if (response.user != null) {
        // Fetch user profile
        final userResponse = await _supabase
            .from('users')
            .select()
            .eq('id', response.user!.id)
            .single();

        _user = UserModel.fromJson(userResponse);
        await StorageService.setObject(AppConfig.userDataKey, _user!.toJson());
        
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<void> logout() async {
    try {
      await _supabase.auth.signOut();
      _user = null;
      await StorageService.remove(AppConfig.userDataKey);
      notifyListeners();
    } catch (e) {
      _setError(e.toString());
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _error = error;
    notifyListeners();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}