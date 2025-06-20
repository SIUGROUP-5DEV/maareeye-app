import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseService {
  static final DatabaseService instance = DatabaseService._init();
  static Database? _database;

  DatabaseService._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('finance_app.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);

    return await openDatabase(
      path,
      version: 1,
      onCreate: _createDB,
    );
  }

  Future _createDB(Database db, int version) async {
    // Users table
    await db.execute('''
      CREATE TABLE users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        profile_image TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    ''');

    // Transactions table
    await db.execute('''
      CREATE TABLE transactions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    ''');

    // Categories table
    await db.execute('''
      CREATE TABLE categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        color TEXT NOT NULL,
        icon TEXT NOT NULL
      )
    ''');

    // Insert default categories
    await _insertDefaultCategories(db);
  }

  Future _insertDefaultCategories(Database db) async {
    final expenseCategories = [
      {'id': '1', 'name': 'Food & Dining', 'type': 'expense', 'color': '0xFF3B82F6', 'icon': 'restaurant'},
      {'id': '2', 'name': 'Transportation', 'type': 'expense', 'color': '0xFF10B981', 'icon': 'directions_car'},
      {'id': '3', 'name': 'Shopping', 'type': 'expense', 'color': '0xFFF59E0B', 'icon': 'shopping_bag'},
      {'id': '4', 'name': 'Bills & Utilities', 'type': 'expense', 'color': '0xFFEF4444', 'icon': 'receipt'},
      {'id': '5', 'name': 'Entertainment', 'type': 'expense', 'color': '0xFF8B5CF6', 'icon': 'movie'},
      {'id': '6', 'name': 'Healthcare', 'type': 'expense', 'color': '0xFFEC4899', 'icon': 'local_hospital'},
      {'id': '7', 'name': 'Education', 'type': 'expense', 'color': '0xFF06B6D4', 'icon': 'school'},
      {'id': '8', 'name': 'Others', 'type': 'expense', 'color': '0xFF6B7280', 'icon': 'category'},
    ];

    final incomeCategories = [
      {'id': '9', 'name': 'Salary', 'type': 'income', 'color': '0xFF10B981', 'icon': 'work'},
      {'id': '10', 'name': 'Freelance', 'type': 'income', 'color': '0xFF3B82F6', 'icon': 'laptop'},
      {'id': '11', 'name': 'Investment', 'type': 'income', 'color': '0xFFF59E0B', 'icon': 'trending_up'},
      {'id': '12', 'name': 'Business', 'type': 'income', 'color': '0xFF8B5CF6', 'icon': 'business'},
      {'id': '13', 'name': 'Gift', 'type': 'income', 'color': '0xFFEC4899', 'icon': 'card_giftcard'},
      {'id': '14', 'name': 'Others', 'type': 'income', 'color': '0xFF6B7280', 'icon': 'category'},
    ];

    for (final category in [...expenseCategories, ...incomeCategories]) {
      await db.insert('categories', category);
    }
  }

  Future<void> initDatabase() async {
    await database;
  }

  Future close() async {
    final db = await instance.database;
    db.close();
  }
}