/* ========= Target ========= */
interface AppLogger {
  info(message: string): void;
  error(message: string): void;
}

/* ========= Adaptee ========= */
class ConsoleLoggerService {
  log(message: string): void {
    console.log(`[Console Log]: ${message}`);
  }

  logError(message: string): void {
    console.error(`[Console Error]: ${message}`);
  }
}

class WinstonLikeLogger {
  write(level: string, payload: { message: string }): void {
    console.log(`[Winston:${level.toUpperCase()}] ${payload.message}`);
  }
}

/* ========= Adapter ========= */
class ConsoleLoggerAdapter implements AppLogger {
  constructor(private consoleLogger: ConsoleLoggerService) {}

  info(message: string): void {
    this.consoleLogger.log(message);
  }

  error(message: string): void {
    this.consoleLogger.logError(message);
  }
}

class WinstonLoggerAdapter implements AppLogger {
  constructor(private winstonLogger: WinstonLikeLogger) {}

  info(message: string): void {
    this.winstonLogger.write("info", { message });
  }

  error(message: string): void {
    this.winstonLogger.write("error", { message });
  }
}

/* ========= Client ========= */
class UserService {
  constructor(private logger: AppLogger) {}

  createUser(name: string): void {
    this.logger.info(`Creating user: ${name}`);

    if (!name || name.trim().length === 0) {
      this.logger.error("User name cannot be empty.");
      return;
    }

    this.logger.info(`User "${name}" created successfully.`);
  }
}

/* ========= run ========= */

function main(): void {
  const consoleLogger = new ConsoleLoggerAdapter(new ConsoleLoggerService());
  const winstonLogger = new WinstonLoggerAdapter(new WinstonLikeLogger());

  const userServiceWithConsole = new UserService(consoleLogger);
  const userServiceWithWinston = new UserService(winstonLogger);

  userServiceWithConsole.createUser("Hassan");
  console.log("---------------------------");
  userServiceWithConsole.createUser("");
  console.log("---------------------------");
  userServiceWithWinston.createUser("Ahmad");
}

main();
