const axios = require("axios");
const apiConfig = require("../src/configurations/configurations.json");
const {listProfiles, createQuote, createRecipient, createTransfer} = require("../index");

jest.mock("axios");

describe("Wise API tests", () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiConfig.token}`,
        },
    };

    let error;

    beforeEach(() => {
        error = new Error("Bad request");
        error.response = {
            status: 400,
            headers: {"x-trace-id": "quote-err"},
            data: {message: "Bad request"},
        };
        jest.clearAllMocks();
    });

    test("listProfiles returns data on success", async () => {
        const mockData = [{id: 1, type: "PERSONAL"}];
        axios.get.mockResolvedValue({data: mockData});
        const result = await listProfiles();
        expect(axios.get).toHaveBeenCalledWith(
            "https://api.sandbox.transferwise.tech/v2/profiles",
            config
        );
        expect(result).toEqual(mockData);
    });

    test("listProfiles throws error on failure", async () => {
        axios.get.mockRejectedValue(error);
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {
        });
        await expect(listProfiles()).rejects.toEqual(error);
        spy.mockRestore();
    });

    test("createQuote returns data on success", async () => {
        const mockData = {id: "quote123"};
        axios.post.mockResolvedValue({data: mockData});

        const result = await createQuote(1);
        expect(axios.post).toHaveBeenCalledWith(
            "https://api.sandbox.transferwise.tech/v3/profiles/1/quotes",
            {sourceCurrency: "SGD", targetCurrency: "GBP", sourceAmount: 1000},
            config
        );
        expect(result).toEqual(mockData);
    });

    test("createQuote throws error on failure", async () => {
        axios.post.mockRejectedValue(error);
        const spy = jest.spyOn(console, "error").mockImplementation(() => {
        });
        await expect(createQuote(1)).rejects.toEqual(error);
        spy.mockRestore();
    });

    test("createRecipient returns data on success", async () => {
        const mockData = {id: "recipient123"};
        axios.post.mockResolvedValue({data: mockData});

        const result = await createRecipient();
        expect(axios.post).toHaveBeenCalledWith(
            "https://api.sandbox.transferwise.tech/v1/accounts",
            {
                accountHolderName: "GBP Person Name",
                currency: "GBP",
                type: "sort_code",
                details: {
                    legalType: "PRIVATE",
                    sortCode: "04-00-04",
                    accountNumber: "12345678",
                },
            },
            config
        );
        expect(result).toEqual(mockData);
    });

    test("createRecipient throws error on failure", async () => {
        axios.post.mockRejectedValue(error);
        const spy = jest.spyOn(console, "error").mockImplementation(() => {
        });
        await expect(createRecipient()).rejects.toEqual(error);
        spy.mockRestore();
    });

    test("createTransfer returns data on success", async () => {
        const mockData = {id: "transfer123"};
        axios.post.mockResolvedValue({data: mockData});

        const result = await createTransfer(1, 2, "quote123");
        expect(axios.post).toHaveBeenCalledWith(
            "https://api.sandbox.transferwise.tech/v1/transfers",
            expect.objectContaining({
                targetAccount: 2,
                quoteUuid: "quote123",
                customerTransactionId: expect.any(String),
                details: {reference: "to my friend"},
            }),
            config
        );
        expect(result).toEqual(mockData);
    });

    test("createTransfer throws error on failure", async () => {
        axios.post.mockRejectedValue(error);
        const spy = jest.spyOn(console, "error").mockImplementation(() => {
        });
        await expect(createTransfer(1, 2, "quote123")).rejects.toThrow();
        spy.mockRestore();
    });


});
