import Rates from './type/Rates.js';
import { getRates as getRatesFromApi, getFlagSource } from './api/exchange.js' ;
import { getRates as getRatesFromStorage, saveRates } from './storage/exchange.js';

export default async function getRates(code, date) {
    try {
        return await getRatesFromStorage(code, date);
    } catch (e) {
        const { base, last_updated, exchange_rates } = await getRatesFromApi(code, date);
        const rates = new Rates(base, Object.assign({}, exchange_rates), last_updated, getFlagSource);   
        saveRates(rates);
        return rates;
    }
}







