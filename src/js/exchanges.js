import getRates from './services/exchange.js';
import {
    initializeTable,
    watchAmountChanges,
    getInput as getChanges,
    validateInput as validateChanges,
    makeChanges,
} from './ui/main.js';

export async function initialize() {
    const DEFAULT_BASE = 'ARS';
    initializeTable(await getRates(DEFAULT_BASE));
    watchAmountChanges();
}

export async function updateRates(e) {
    e.preventDefault();
    const { currency, date } = getChanges();
    if (validateChanges({ currency, date })) {
        makeChanges(date, await getRates(currency, date));
    }
}
