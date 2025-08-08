const db = require('../db');

class Class {
  static async getAll() {
    const [rows] = await db.execute('SELECT id, name FROM class');
    return rows;
  }
}

module.exports = Class; 