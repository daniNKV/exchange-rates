import getRates from './services/exchange.js';
import {
    updateDate,
    fillSelectors,
    populateTable,
    watchAmountChanges,
    validateChanges,
    getChanges,
    makeChanges,
    
} from './ui/ui.js';
import { parseDate as parseTimestamp } from './ui/utils.js';

async function initialize() {
    const DEFAULT_BASE = 'ARS';
    const rates = await getRates(DEFAULT_BASE);
    const { base, coins, date, flags_source } = rates;
    updateDate(date);
    fillSelectors(base, coins);
    populateTable(base, coins, flags_source);
    watchAmountChanges();
}

async function updateRates() {
    e.preventDefault();
    const { date, currency } = getChanges();
    if (validateChanges(date, currency)) {
        makeChanges(date, await getRates(currency, parseTimestamp(date)));
    }
}

document.addEventListener('load', initialize());
document.getElementById('submit-button').addEventListener('click', updateRates);
