import getRates from './services/exchange.js';
import {
    initializeTable,
    getInput as getChanges,
    validateInput as validateChanges,
    makeChanges,
    watchAmountChanges,
} from './ui/main.js';

async function initialize() {
    const DEFAULT_BASE = 'ARS';
    const rates = await getRates(DEFAULT_BASE);
    initializeTable(rates);
    watchAmountChanges();
}

async function updateRates(e) {
    e.preventDefault();
    const { currency, date } = getChanges();
    if (validateChanges({ currency, date })) {
        const rates = await getRates(currency, date);
        makeChanges(date, rates);
    }
}

document.addEventListener('load', initialize());
document.getElementById('submit-button').addEventListener('click', updateRates);
