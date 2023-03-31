
import { getRates, getHistoricalRates, DEFAULT_BASE, retrieveFlagSource} from './exchange.js';
import {
    setActualDate,
    updateDate,
    makeChanges,
    fillBaseSelector,
    populateTable,
    watchAmountChanges,
    hightlightCurrentBase,
    highlightError
} from './ui.js';

import { parseDate, dateIsValid } from './utils.js';

async function initialize() {
    const actualRates = await getRates();
    const actualDate = parseDate(new Date());

    setActualDate(actualDate);
    updateDate(actualDate);
    fillBaseSelector(Object.keys(actualRates), DEFAULT_BASE);
    populateTable(actualRates, retrieveFlagSource, DEFAULT_BASE);
    watchAmountChanges();
    hightlightCurrentBase(DEFAULT_BASE);
    
    return
}


async function update(date, currency, needHistorical) {
    if (needHistorical) {
        makeChanges(date, await getHistoricalRates(date, currency), currency);
    } else {
        makeChanges(date, await getRates(currency), currency);
    }

    return
}


function validateChanges(){
    const selectedDate = document.getElementById('date-input').value;
    const selectedCurrency = document.getElementById('base-coin').value;
    const needHistorical = selectedDate !== parseDate(new Date());
    
    dateIsValid(selectedDate) ? update(selectedDate, selectedCurrency, needHistorical) : highlightError('date-input');
}


document.addEventListener('load', initialize());
document.getElementById('submit-button').addEventListener('click', validateChanges);