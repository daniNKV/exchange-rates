import fetchRates from './api/exchange.js';
import { getRates as getRatesFromStorage, saveRates } from './storage/exchange.js';

export default async function getRates(code = '', date = '') {
    try {
        return getRatesFromStorage(code, date);
    } catch (error) {
        const rates = await fetchRates(code, date);
        saveRates(rates);
        return rates;
    }
}
