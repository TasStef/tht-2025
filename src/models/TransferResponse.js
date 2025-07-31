class Transfer {
  constructor(data) {
    this.id = data.id;
    this.user = data.user;
    this.targetAccount = data.targetAccount;
    this.sourceAccount = data.sourceAccount;
    this.quote = data.quote;
    this.quoteUuid = data.quoteUuid;
    this.status = data.status;
    this.reference = data.reference;
    this.rate = data.rate;
    this.created = data.created;
    this.business = data.business;
    this.transferRequest = data.transferRequest;
    this.details = data.details ? new TransferDetails(data.details) : null;
    this.hasActiveIssues = data.hasActiveIssues;
    this.sourceCurrency = data.sourceCurrency;
    this.sourceValue = data.sourceValue;
    this.targetCurrency = data.targetCurrency;
    this.targetValue = data.targetValue;
    this.customerTransactionId = data.customerTransactionId;
  }
}

class TransferDetails {
  constructor(data) {
    this.reference = data.reference;
  }
}

module.exports = {
  Transfer,
  TransferDetails
};
