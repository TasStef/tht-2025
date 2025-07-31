class Address {
    constructor(data) {
        this.id = data.id;
        this.addressFirstLine = data.addressFirstLine;
        this.city = data.city;
        this.countryIso2Code = data.countryIso2Code;
        this.countryIso3Code = data.countryIso3Code;
        this.postCode = data.postCode;
        this.stateCode = data.stateCode;
    }
}

class ContactDetails {
    constructor(data) {
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
    }
}

class Profile {
    constructor(data) {
        this.id = data.id;
        this.publicId = data.publicId;
        this.userId = data.userId;
        this.type = data.type;
        this.address = new Address(data.address);
        this.email = data.email;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.creatorClientId = data.creatorClientId;
        this.obfuscated = data.obfuscated;
        this.currentState = data.currentState;
        this.profileRole = data.profileRole;
        this.contactDetails = new ContactDetails(data.contactDetails);
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.dateOfBirth = data.dateOfBirth;
        this.phoneNumber = data.phoneNumber;
        this.secondaryAddresses = data.secondaryAddresses;
        this.dataObfuscated = data.dataObfuscated;
        this.partner = data.partner;
        this.fullName = data.fullName;
        this.partnerCustomer = data.partnerCustomer;
    }
}

module.exports = { Address, ContactDetails, Profile };
