/* ========= Products ========= */

interface Logger {
  log(message: string): void;
}

/* ========= Concrete Product  ========= */

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[Console Logger]: ${message}`);
  }
}
class FileLogger implements Logger {
  log(message: string): void {
    console.log(`[File Logger]: Writing "${message}" to file...`);
  }
}
class CloudLogger implements Logger {
  log(message: string): void {
    console.log(`[Cloud Logger]: Sending "${message}" to cloud service...`);
  }
}

/* ========= Creator  ========= */

abstract class LoggerCreator {
  protected abstract createLogger(): Logger;

  public writeLog(message: string): void {
    const logger = this.createLogger();

    // Business logic uses the product
    const formattedMessage = this.formatMessage(message);
    logger.log(formattedMessage);
  }

  protected formatMessage(message: string): string {
    const timestamp = new Date().toISOString();
    return `${timestamp} - ${message}`;
  }
}

/* ========= Concrete Creators  ========= */

class ConsoleLoggerCreator extends LoggerCreator {
  protected createLogger(): Logger {
    return new ConsoleLogger();
  }
}

class FileLoggerCreator extends LoggerCreator {
  protected createLogger(): Logger {
    return new FileLogger();
  }
}
class CloudLoggerCreator extends LoggerCreator {
  protected createLogger(): Logger {
    return new CloudLogger();
  }
}

/* ========= run  ========= */

function runLogger(creator: LoggerCreator, message: string): void {
  creator.writeLog(message);
}

function main(): void {
  const consoleLogger = new ConsoleLoggerCreator();
  const fileLogger = new FileLoggerCreator();
  const cloudLogger = new CloudLoggerCreator();

  runLogger(consoleLogger, "Application started successfully.");
  runLogger(fileLogger, "User profile updated.");
  runLogger(cloudLogger, "Payment completed.");
}

main();
