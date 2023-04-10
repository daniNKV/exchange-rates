import { getActual, getHistorical, getFlagSource } from './api.js';
import Rates from '../type/Rates.js';

const DEFAULT_BASE = 'ARS';
const toArray = (obj = {}) => Object.entries(obj);

export default async function fetchRates(coin = DEFAULT_BASE, date = '') {
    const coins = date
        ? await getHistorical(coin, date)
        : await getActual(coin);
    return new Rates({
        base: coins.base,
        rates: toArray(coins.rates),
        date: coins.date,
        callback: getFlagSource,
    });
}
