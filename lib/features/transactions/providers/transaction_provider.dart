import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:uuid/uuid.dart';

import '../models/transaction_model.dart';

class TransactionProvider extends ChangeNotifier {
  final SupabaseClient _supabase = Supabase.instance.client;
  final Uuid _uuid = const Uuid();

  List<TransactionModel> _transactions = [];
  List<CategoryModel> _categories = [];
  bool _isLoading = false;
  String? _error;

  List<TransactionModel> get transactions => _transactions;
  List<CategoryModel> get categories => _categories;
  bool get isLoading => _isLoading;
  String? get error => _error;

  List<CategoryModel> getCategoriesByType(String type) {
    return _categories.where((category) => category.type == type).toList();
  }

  double get totalBalance {
    double income = _transactions
        .where((t) => t.type == 'income')
        .fold(0, (sum, t) => sum + t.amount);
    double expenses = _transactions
        .where((t) => t.type == 'expense')
        .fold(0, (sum, t) => sum + t.amount);
    return income - expenses;
  }

  double get monthlyIncome {
    final now = DateTime.now();
    final currentMonth = DateTime(now.year, now.month);
    return _transactions
        .where((t) => t.type == 'income' && t.date.isAfter(currentMonth))
        .fold(0, (sum, t) => sum + t.amount);
  }

  double get monthlyExpenses {
    final now = DateTime.now();
    final currentMonth = DateTime(now.year, now.month);
    return _transactions
        .where((t) => t.type == 'expense' && t.date.isAfter(currentMonth))
        .fold(0, (sum, t) => sum + t.amount);
  }

  List<TransactionModel> get recentTransactions {
    final sorted = List<TransactionModel>.from(_transactions);
    sorted.sort((a, b) => b.date.compareTo(a.date));
    return sorted.take(5).toList();
  }

  Future<void> loadTransactions(String userId) async {
    try {
      _setLoading(true);
      _setError(null);

      final response = await _supabase
          .from('transactions')
          .select()
          .eq('user_id', userId)
          .order('date', ascending: false);

      _transactions = response.map<TransactionModel>((json) => TransactionModel.fromJson(json)).toList();
      notifyListeners();
    } catch (e) {
      _setError(e.toString());
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadCategories() async {
    try {
      final response = await _supabase.from('categories').select();
      _categories = response.map<CategoryModel>((json) => CategoryModel.fromJson(json)).toList();
      notifyListeners();
    } catch (e) {
      _setError(e.toString());
    }
  }

  Future<bool> addTransaction({
    required String userId,
    required String type,
    required double amount,
    required String description,
    required String category,
    DateTime? date,
  }) async {
    try {
      _setLoading(true);
      _setError(null);

      final transaction = TransactionModel(
        id: _uuid.v4(),
        userId: userId,
        type: type,
        amount: amount,
        description: description,
        category: category,
        date: date ?? DateTime.now(),
        createdAt: DateTime.now(),
      );

      await _supabase.from('transactions').insert(transaction.toJson());
      
      _transactions.insert(0, transaction);
      notifyListeners();
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> updateTransaction(TransactionModel transaction) async {
    try {
      _setLoading(true);
      _setError(null);

      await _supabase
          .from('transactions')
          .update(transaction.toJson())
          .eq('id', transaction.id);

      final index = _transactions.indexWhere((t) => t.id == transaction.id);
      if (index != -1) {
        _transactions[index] = transaction;
        notifyListeners();
      }
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> deleteTransaction(String transactionId) async {
    try {
      _setLoading(true);
      _setError(null);

      await _supabase.from('transactions').delete().eq('id', transactionId);
      
      _transactions.removeWhere((t) => t.id == transactionId);
      notifyListeners();
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    } finally {
      _setLoading(false);
    }
  }

  Map<String, double> getCategoryExpenses() {
    final now = DateTime.now();
    final currentMonth = DateTime(now.year, now.month);
    
    final monthlyExpenses = _transactions
        .where((t) => t.type == 'expense' && t.date.isAfter(currentMonth))
        .toList();

    final Map<String, double> categoryTotals = {};
    for (final transaction in monthlyExpenses) {
      categoryTotals[transaction.category] = 
          (categoryTotals[transaction.category] ?? 0) + transaction.amount;
    }
    
    return categoryTotals;
  }

  List<Map<String, dynamic>> getMonthlyTrends() {
    final now = DateTime.now();
    final trends = <Map<String, dynamic>>[];
    
    for (int i = 5; i >= 0; i--) {
      final month = DateTime(now.year, now.month - i);
      final nextMonth = DateTime(now.year, now.month - i + 1);
      
      final monthTransactions = _transactions.where((t) => 
          t.date.isAfter(month) && t.date.isBefore(nextMonth)).toList();
      
      final income = monthTransactions
          .where((t) => t.type == 'income')
          .fold(0.0, (sum, t) => sum + t.amount);
      
      final expenses = monthTransactions
          .where((t) => t.type == 'expense')
          .fold(0.0, (sum, t) => sum + t.amount);
      
      trends.add({
        'month': _getMonthName(month.month),
        'income': income,
        'expenses': expenses,
        'savings': income - expenses,
      });
    }
    
    return trends;
  }

  String _getMonthName(int month) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[month - 1];
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