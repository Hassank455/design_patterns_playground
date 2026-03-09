class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }

  error(message: string) {
    console.log(`[ERROR]: ${message}`);
  }
}

export default Logger;