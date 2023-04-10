// const process = require('process');
// const keys = process.env.RATES_KEY;
const axios = require('axios');

const getUrl = (base = '', date = '') => {
    if (!date) {
        return `https://api.exchangerate.host/latest${base ? `?base=${base}` : ''}`;
    }
    return `https://api.exchangerate.host/${date}?base=${base}`;
};

const handler = async (e) => {
    const { base, date } = e.queryStringParameters;
    const URL = getUrl(base, date);
    try {
        const { data } = await axios.get(URL);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        const {
            data, headers, status, statusText,
        } = error.response;
        return {
            statusCode: error.response.status,
            body: JSON.stringify({
                status, statusText, headers, data,
            }),
        };
    }
};

module.exports = { handler };
