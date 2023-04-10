import getRates from './services/exchange.js';
import {
    initializeTable,
    getInput as getChanges,
    validateInput as validateChanges,
    makeChanges,
    watchAmountChanges,
} from './ui/main.js';

export async function initialize() {
    const DEFAULT_BASE = 'ARS';
    const rates = await getRates(DEFAULT_BASE);
    initializeTable(rates);
    watchAmountChanges();
}

export async function updateRates(e) {
    e.preventDefault();
    const { currency, date } = getChanges();
    if (validateChanges({ currency, date })) {
        const rates = await getRates(currency, date);
        makeChanges(date, rates);
    }
}
