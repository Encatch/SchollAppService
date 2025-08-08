const db = require('../db');

class FeeDetails {
  static async create(studentId, feeDetailsDTO) {
    const [result] = await db.execute(
      `INSERT INTO fee_details (student_id, total_fee, discount_amount, total_terms, remaining_amount)
      VALUES (?, ?, ?, ?, ?)`,
      [
        studentId,
        feeDetailsDTO.totalFee,
        feeDetailsDTO.discountAmount,
        feeDetailsDTO.totalTerms,
        feeDetailsDTO.remainingAmount
      ]
    );
    return result.insertId;
  }

  static async update(studentId, feeDetailsDTO) {
    await db.execute(
      `UPDATE fee_details SET total_fee=?, discount_amount=?, total_terms=?, remaining_amount=? WHERE student_id=?`,
      [
        feeDetailsDTO.totalFee,
        feeDetailsDTO.discountAmount,
        feeDetailsDTO.totalTerms,
        feeDetailsDTO.remainingAmount,
        studentId
      ]
    );
  }
}

module.exports = FeeDetails; 