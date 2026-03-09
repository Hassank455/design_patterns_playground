class Database {
  private static instance: Database;

  private constructor() {
    console.log("Database connected...");
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  query(sql: string) {
    console.log(`Executing query: ${sql}`);
  }
}

export default Database;