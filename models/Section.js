const db = require('../db');

class Section {
  static async getByClassId(classId) {
    const [rows] = await db.execute('SELECT id, name, classId FROM section WHERE classId = ?', [classId]);
    return rows;
  }
}

module.exports = Section; 