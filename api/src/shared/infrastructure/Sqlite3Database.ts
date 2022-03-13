import { Database } from 'sqlite3';

export class Sqlite3Database {
  private static db: Database;
  public constructor() {
    this.setUp();
  }
  private setUp(): void {
    if (Sqlite3Database.db !== undefined) {
      return;
    }
    Sqlite3Database.db = new Database(':memory:');
    Sqlite3Database.db.serialize(() => {
      Sqlite3Database.db.run(
        `CREATE TABLE tasks (
            title TEXT NOT NULL, 
            description TEXT,
            priority TEXT DEFAULT "low",
            status TEXT NOT NULL
        )`,
      );
    });
  }
  public query(
    sql: string,
    params: string[] = [],
  ): Promise<{
    changes: number;
    lastId: number;
  }> {
    return new Promise((resolve, reject) => {
      const statement = Sqlite3Database.db.prepare(sql);
      statement.run(params, function (err: Error) {
        if (err) {
          reject(err);
        }
        statement.finalize((err: Error) => {
          if (err) {
            reject(err);
          }
        });
        resolve({
          changes: this.changes,
          lastId: this.lastID,
        });
      });
    });
  }
  public list(tableName: string, where?: any): Promise<any[] | Error> {
    let sql = `SELECT rowId as id, * FROM ${tableName}`;
    let params = [];
    if (where) {
      const { $or } = where;
      const orStmts = Object.keys($or).join(' LIKE ? OR ') + ' LIKE ?';
      params = params.concat(
        Object.values($or).map((text = '') => `%${text}%`),
      );
      sql += ' WHERE ' + orStmts;
    }
    return new Promise((resolve, reject) => {
      const db = Sqlite3Database.db;
      db.prepare(sql).run(params, function (err: Error) {
        if (err) {
          reject(err);
        }
        this.all((err: Error, rows: any[]) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      });
    });
  }
}
