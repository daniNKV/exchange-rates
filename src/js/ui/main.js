import { validateChanges } from './utils.js';
import {
    fillSelectors,
    setInputDate,
    getChanges,
} from './selectors.js';
import {
    populateTable,
    updateTable,
    setTableDate,
    hightlightCurrentBase,
    updateConvertionValues,
} from './table.js';

function updateDate(newDate) {
    setInputDate(newDate);
    setTableDate(newDate);
}

export function watchAmountChanges() {
    document.getElementById('convertion-amount').addEventListener('input', updateConvertionValues);
}

export const getInput = () => getChanges();

export const validateInput = (input) => validateChanges(input);

export async function makeChanges(date, rates) {
    updateDate(date);
    updateTable(rates.coins);
    hightlightCurrentBase(rates.base);
}

export function initializeTable(rates) {
    const {
        base, date, coins, getFlagSource,
    } = rates;
    updateDate(date);
    fillSelectors(base, coins);
    populateTable(base, coins, getFlagSource);
}
