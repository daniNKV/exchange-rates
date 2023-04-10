import Rates from './type/Rates.js';
import fetchRates from './api/exchange.js';
import { getRates as getRatesFromStorage, saveRates } from './storage/exchange.js';
import { parseDate } from '../ui/utils.js';

export default async function getRates(code = '', date = '') {
    try {
        return getRatesFromStorage(code, date);
    } catch (error) {
        const api = await fetchRates(code, date);
        const baseRate = [[api.base, 1]];
        const rates = new Rates({
            base: api.base,
            rates: baseRate.concat(Object.entries(api.coins)),
            date: api.date,
            callback: api.flagSource,
        });
        saveRates(rates.base, parseDate(rates.date), rates.coins);
        return rates;
    }
}
