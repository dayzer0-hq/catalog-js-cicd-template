// Plain business logic, kept out of the Express layer so it tests without HTTP.

// The largest single payment accepted: ₹1,00,000 in paise.
const MAX_AMOUNT_PAISE = 100_000_00;

// Returns a problem string, or null when the amount is acceptable.
function validateAmount(paise) {
  if (!Number.isInteger(paise) || paise <= 0) {
    return 'amount must be a positive integer of paise';
  }
  if (paise > MAX_AMOUNT_PAISE) {
    return 'amount exceeds the single-payment limit';
  }
  return null;
}

module.exports = { validateAmount, MAX_AMOUNT_PAISE };
