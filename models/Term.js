const db = require('../db');

class Term {
  static async create(feeId, termDTO) {
    await db.execute(
      `INSERT INTO terms (fee_id, term_number, amount, due_date, is_paid)
      VALUES (?, ?, ?, ?, ?)`,
      [
        feeId,
        termDTO.termNumber,
        termDTO.amount,
        termDTO.dueDate,
        termDTO.isPaid
      ]
    );
  }

  static async bulkCreate(feeId, terms) {
    for (const termDTO of terms) {
      await Term.create(feeId, termDTO);
    }
  }
}

module.exports = Term; 