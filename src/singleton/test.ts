import Logger from "./logger_singleton.js";
import Database from "./database_singleton.js";
import AppConfig from "./config_singleton.js";

function main() {

  const logger1 = Logger.getInstance();
  const logger2 = Logger.getInstance();

  console.log("Logger same instance:", logger1 === logger2);

  logger1.log("Application started");

  const db1 = Database.getInstance();
  const db2 = Database.getInstance();

  console.log("Database same instance:", db1 === db2);

  db1.query("SELECT * FROM users");

  const config = AppConfig.getInstance();
  

  console.log(config.apiUrl);
}

main();