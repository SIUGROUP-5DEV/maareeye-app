class AppConfig {
  // Supabase Configuration
  static const String supabaseUrl = 'YOUR_SUPABASE_URL';
  static const String supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
  
  // App Configuration
  static const String appName = 'FinanceApp';
  static const String appVersion = '1.0.0';
  
  // API Configuration
  static const String baseUrl = 'YOUR_API_BASE_URL';
  static const Duration requestTimeout = Duration(seconds: 30);
  
  // Local Storage Keys
  static const String userTokenKey = 'user_token';
  static const String userDataKey = 'user_data';
  static const String biometricEnabledKey = 'biometric_enabled';
  static const String profileImageKey = 'profile_image';
}