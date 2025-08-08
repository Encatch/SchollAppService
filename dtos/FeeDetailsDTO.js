class FeeDetailsDTO {
  constructor(data) {
    this._totalFee = data.total_fee;
    this._discountAmount = data.discount_amount;
    this._totalTerms = data.total_terms;
    this._remainingAmount = data.remaining_amount;
  }

  get totalFee() { return this._totalFee; }
  set totalFee(value) { this._totalFee = value; }

  get discountAmount() { return this._discountAmount; }
  set discountAmount(value) { this._discountAmount = value; }

  get totalTerms() { return this._totalTerms; }
  set totalTerms(value) { this._totalTerms = value; }

  get remainingAmount() { return this._remainingAmount; }
  set remainingAmount(value) { this._remainingAmount = value; }
}

module.exports = FeeDetailsDTO; 