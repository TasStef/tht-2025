class QuoteResponse {
    constructor(data) {
        this.id = data.id;
        this.sourceCurrency = data.sourceCurrency;
        this.targetCurrency = data.targetCurrency;
        this.sourceAmount = data.sourceAmount;
        this.payOut = data.payOut;
        this.preferredPayIn = data.preferredPayIn;
        this.rate = data.rate;
        this.createdTime = data.createdTime;
        this.user = data.user;
        this.profile = data.profile;
        this.rateType = data.rateType;
        this.rateExpirationTime = data.rateExpirationTime;
        this.guaranteedTargetAmountAllowed = data.guaranteedTargetAmountAllowed;
        this.targetAmountAllowed = data.targetAmountAllowed;
        this.guaranteedTargetAmount = data.guaranteedTargetAmount;
        this.providedAmountType = data.providedAmountType;
        this.pricingConfiguration = data.pricingConfiguration ? new PricingConfiguration(data.pricingConfiguration) : null;
        this.paymentOptions = Array.isArray(data.paymentOptions) ? data.paymentOptions.map(opt => new PaymentOption(opt)) : [];
        this.status = data.status;
        this.expirationTime = data.expirationTime;
        this.notices = Array.isArray(data.notices) ? data.notices.map(n => new Notice(n)) : [];
    }
}

class PricingConfiguration {
    constructor(data) {
        this.fee = data.fee ? new Fee(data.fee) : null;
    }
}

class Fee {
    constructor(data) {
        this.type = data.type;
        this.variable = data.variable;
        this.fixed = data.fixed;
        // this.transferwise = data.transferwise;
        // this.payIn = data.payIn;
        // this.discount = data.discount;
        // this.partner = data.partner;
        // this.total = data.total;
    }
}

class PaymentOption {
    constructor(data) {
        this.disabled = data.disabled;
        this.estimatedDelivery = data.estimatedDelivery;
        this.formattedEstimatedDelivery = data.formattedEstimatedDelivery;
        this.estimatedDeliveryDelays = Array.isArray(data.estimatedDeliveryDelays) ? data.estimatedDeliveryDelays.map(d => new EstimatedDeliveryDelay(d)) : [];
        this.fee = data.fee ? new Fee(data.fee) : null;
        this.price = data.price ? new Price(data.price) : null;
        this.sourceAmount = data.sourceAmount;
        this.targetAmount = data.targetAmount;
        this.sourceCurrency = data.sourceCurrency;
        this.targetCurrency = data.targetCurrency;
        this.payIn = data.payIn;
        this.payOut = data.payOut;
        this.allowedProfileTypes = data.allowedProfileTypes;
        this.payInProduct = data.payInProduct;
        this.feePercentage = data.feePercentage;
    }
}

class EstimatedDeliveryDelay {
    constructor(data) {
        this.reason = data.reason;
    }
}

class Price {
    constructor(data) {
        this.priceSetId = data.priceSetId;
        this.total = data.total ? new PriceItem(data.total) : null;
        this.items = Array.isArray(data.items) ? data.items.map(i => new PriceItem(i)) : [];
        this.deferredFee = data.deferredFee;
        this.calculatedOn = data.calculatedOn;
    }
}

class PriceItem {
    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.label = data.label;
        this.value = data.value;
        this.explanation = data.explanation;
    }
}

class Notice {
    constructor(data) {
        this.text = data.text;
        this.link = data.link;
        this.type = data.type;
    }
}

module.exports = {
    QuoteResponse,
    PricingConfiguration,
    Fee,
    PaymentOption,
    EstimatedDeliveryDelay,
    Price,
    PriceItem,
    Notice
};
