import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

import '../../auth/models/user_model.dart';
import '../../../core/services/storage_service.dart';
import '../../../core/config/app_config.dart';

class ProfileProvider extends ChangeNotifier {
  final SupabaseClient _supabase = Supabase.instance.client;
  final ImagePicker _imagePicker = ImagePicker();

  bool _isLoading = false;
  String? _error;
  String? _profileImagePath;

  bool get isLoading => _isLoading;
  String? get error => _error;
  String? get profileImagePath => _profileImagePath;

  ProfileProvider() {
    _loadProfileImage();
  }

  Future<void> _loadProfileImage() async {
    await StorageService.init();
    _profileImagePath = StorageService.getString(AppConfig.profileImageKey);
    notifyListeners();
  }

  Future<bool> updateProfile({
    required String userId,
    String? firstName,
    String? lastName,
    String? email,
  }) async {
    try {
      _setLoading(true);
      _setError(null);

      final updates = <String, dynamic>{};
      if (firstName != null) updates['first_name'] = firstName;
      if (lastName != null) updates['last_name'] = lastName;
      if (email != null) updates['email'] = email;
      updates['updated_at'] = DateTime.now().toIso8601String();

      await _supabase.from('users').update(updates).eq('id', userId);
      
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> uploadProfileImage(ImageSource source) async {
    try {
      _setLoading(true);
      _setError(null);

      final XFile? image = await _imagePicker.pickImage(
        source: source,
        maxWidth: 512,
        maxHeight: 512,
        imageQuality: 80,
      );

      if (image != null) {
        // In a real app, you would upload to Supabase Storage
        // For now, we'll just store the local path
        _profileImagePath = image.path;
        await StorageService.setString(AppConfig.profileImageKey, image.path);
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

  Future<bool> removeProfileImage() async {
    try {
      _setLoading(true);
      _setError(null);

      _profileImagePath = null;
      await StorageService.remove(AppConfig.profileImageKey);
      notifyListeners();
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
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