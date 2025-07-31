class Recipient {
    constructor(data) {
        this.id = data.id;
        this.creatorId = data.creatorId;
        this.profileId = data.profileId;
        this.name = data.name ? new Name(data.name) : null;
        this.currency = data.currency;
        this.country = data.country;
        this.type = data.type;
        this.legalEntityType = data.legalEntityType;
        this.active = data.active;
        this.details = data.details ? new Details(data.details) : null;
        this.commonFieldMap = data.commonFieldMap ? new CommonFieldMap(data.commonFieldMap) : null;
        this.hash = data.hash;
        this.accountSummary = data.accountSummary;
        this.longAccountSummary = data.longAccountSummary;
        this.displayFields = Array.isArray(data.displayFields)
            ? data.displayFields.map(f => new DisplayField(f))
            : [];
        this.isInternal = data.isInternal;
        this.ownedByCustomer = data.ownedByCustomer;
    }
}

class Name {
    constructor(data) {
        this.fullName = data.fullName;
        this.givenName = data.givenName;
        this.familyName = data.familyName;
        this.middleName = data.middleName;
        this.patronymicName = data.patronymicName;
        this.cannotHavePatronymicName = data.cannotHavePatronymicName;
    }
}

class Details {
    constructor(data) {
        this.reference = data.reference;
        this.accountNumber = data.accountNumber;
        this.sortCode = data.sortCode;
        this.hashedByLooseHashAlgorithm = data.hashedByLooseHashAlgorithm;
    }
}

class CommonFieldMap {
    constructor(data) {
        this.accountNumberField = data.accountNumberField;
        this.bankCodeField = data.bankCodeField;
    }
}

class DisplayField {
    constructor(data) {
        this.key = data.key;
        this.label = data.label;
        this.value = data.value;
    }
}

module.exports = {
    Recipient,
    Name,
    Details,
    CommonFieldMap,
    DisplayField
};
