const axios = require('axios');
const apiConfig = require('../src/configurations/configurations.json');

test('Integration: listProfiles should respond with 200', async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${apiConfig.token}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.get('https://api.sandbox.transferwise.tech/v2/profiles', config);

    expect(response.status).toBe(200);
});
