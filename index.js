const axios = require("axios");
const uuid = require("uuid");
const apiConfig = require("./src/configurations/configurations.json")
const {Profile} = require('./src/models/ProfilesResponse');
const {QuoteResponse} = require('./src/models/QuoteResponse');

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiConfig.token}`
    },
}

const listProfiles = async () => {
    try {
        const url = `https://api.sandbox.transferwise.tech/v2/profiles`;
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error(`Status ${error.response.status}`);
        console.error(`Trace ID: ${error.response.headers["x-trace-id"]}`);
        console.error(error.response.data);
        throw error;
    }
};

const createQuote = async (profileId) => {
    try {
        const url = `https://api.sandbox.transferwise.tech/v3/profiles/${profileId}/quotes`;
        const body = {
            sourceCurrency: "SGD",
            targetCurrency: "GBP",
            sourceAmount: 1000
        };

        const response = await axios.post(url, body, config);
        return response.data;
    } catch (error) {
        console.error(`Status ${error.response.status}`);
        console.error(`Trace ID: ${error.response.headers["x-trace-id"]}`);
        console.error(error.response.data);
        throw error;
    }
};

const createRecipient = async () => {
    try {
        const url = `https://api.sandbox.transferwise.tech/v1/accounts`;
        const body = {
            accountHolderName: "GBP Person Name",
            currency: "GBP",
            type: "sort_code",
            details: {
                legalType: "PRIVATE",
                sortCode: "04-00-04",
                accountNumber: "12345678",
            },
        };

        const response = await axios.post(url, body, config);
        return response.data;
    } catch (error) {
        console.error(`Status ${error.response.status}`);
        console.error(`Trace ID: ${error.response.headers["x-trace-id"]}`);
        console.error(error.response.data);
        throw error;
    }
};

const createTransfer = async () => {
    try {
        const url = `https://api.sandbox.transferwise.tech`;
        const body = {};
        const response = await axios.post(url, body, config);
        return response.data;
    } catch (error) {
        console.error(`Status ${error.response.status}`);
        console.error(`Trace ID: ${error.response.headers["x-trace-id"]}`);
        console.error(error.response.data);
        throw error;
    }
};

// TASK
const runLogic = async () => {
    // Task 1: Find out the Personal Profile ID of the user.

    let rawProfiles = await listProfiles();
    let profiles = [];
    rawProfiles.forEach((profile) => profiles.push(new Profile(profile)));
    const personalProfile = profiles.find((profile) => profile.type === 'PERSONAL');
    const profileId = personalProfile ? personalProfile.id : null;
    console.log(`Profile ID: ${profileId}`); // Example Console Log

    // Create Quote
    const rawQuote = await createQuote(profileId);
    const quote = new QuoteResponse(rawQuote);

    // [IMP] Select BANK_TRANSFER option for both payin and payout
    // Make sure you are selecting the correct payin and payout options to get the correct transfer fee.
    // Task 2: Console Log the Quote ID
    console.log(`Quote ID: ${quote.id}`);
    // Task 3: Console Log the Amount the recipient will receive, including the currency (e.g. "12.34 GBP")
    const optionBankTransfer = quote.paymentOptions.find((option) => option.payIn === "BANK_TRANSFER" && option.payOut === "BANK_TRANSFER");
    console.log(`Amount the recipient will receive: ${optionBankTransfer.targetAmount} ${quote.targetCurrency}`);
    // Task 4: Console Log the Exchange Rate (4 decimal places, e.g. "1.2345")
    console.log(`Exchange Rate: ${quote.rate.toFixed(4)}`);
    // Task 5: Console Log the Fees (total fee)
    console.log(`Fees (total fee): ${optionBankTransfer.price.total.value.amount}`);
    // Task 6: Console Log the Delivery Estimates (human readable format)
    console.log(`Delivery Estimates: ${new Date(optionBankTransfer.estimatedDelivery)}`);
    // Create Recipient (GBP Sort Code)
    const recipient = await createRecipient();
    // Task 7: Console Log the Recipient ID

    // Create Transfer
    const transfer = await createTransfer();
    // Task 8: Console Log the Transfer ID
    // Task 9: Console Log the Transfer Status

    // Remember to copy all the console logs to a text file for submission.
    console.log("All tasks completed successfully.");
};

Promise.resolve()
    .then(() => runLogic())
    .catch((error) => {
        console.error("An error occurred", error);
    });
