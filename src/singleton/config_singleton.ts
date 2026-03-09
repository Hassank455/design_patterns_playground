class AppConfig {
  private static instance: AppConfig;

  public apiUrl: string;
  public appName: string;

  /// Alternatively, you can make these properties readonly if they should not be modified after initialization
  // public readonly apiUrl: string;
  // public readonly appName: string;

  private constructor() {
    this.apiUrl = "https://api.example.com";
    this.appName = "Design Patterns App";
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }

    return AppConfig.instance;
  }
}

export default AppConfig;
