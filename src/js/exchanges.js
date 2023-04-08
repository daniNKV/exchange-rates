import {
    getRates, getHistoricalRates, DEFAULT_BASE, retrieveFlagSource,
} from './services/api/exchange.js';
import {
    setActualDate,
    updateDate,
    makeChanges,
    fillBaseSelector,
    populateTable,
    watchAmountChanges,
    hightlightCurrentBase,
    highlightError,
} from './ui/ui';

import { parseDate, dateIsValid } from './ui/utils';

export default async function initialize() {
    const actualRates = await getRates();
    const actualDate = parseDate(new Date());

    setActualDate(actualDate);
    updateDate(actualDate);
    fillBaseSelector(Object.keys(actualRates), DEFAULT_BASE);
    populateTable(actualRates, retrieveFlagSource, DEFAULT_BASE);
    watchAmountChanges();
    hightlightCurrentBase(DEFAULT_BASE);
}

async function update(date, currency, needHistorical) {
    if (needHistorical) {
        makeChanges(date, await getHistoricalRates(date, currency), currency);
    } else {
        makeChanges(date, await getRates(currency), currency);
    }
}

function validateChanges() {
    const selectedDate = document.getElementById('date-input').value;
    const selectedCurrency = document.getElementById('base-coin').value;
    const needHistorical = selectedDate !== parseDate(new Date());

    if (dateIsValid(selectedDate)) {
        update(selectedDate, selectedCurrency, needHistorical);
    } else {
        highlightError('date-input');
    }
}

document.addEventListener('load', initialize());
document.getElementById('submit-button').addEventListener('click', validateChanges);
