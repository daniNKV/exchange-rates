import { isPositiveNumber } from './utils';

export function setActualDate(date) {
    const $dateInput = document.getElementById('date-input');

    $dateInput.max = date;
    $dateInput.value = date;
}

export function updateDate(date) {
    const $tableDate = document.getElementById('table-date');

    $tableDate.textContent = date;
}

function appendCoinOption(option) {
    const $coinsList = document.getElementById('base-coin');

    $coinsList.appendChild(option);
}

function createOption(code) {
    const $coinOptionTemplate = document.getElementById('coin-option').cloneNode(true);
    const option = $coinOptionTemplate.content.querySelector('option');

    option.value = code;
    option.textContent = code;

    return option;
}

// https://flagcdn.com/en/codes.json TODO: USE NAMES INSTEAD OF ISO-ALPHA-CODES-3
export function fillBaseSelector(codes, defaultBase) {
    appendCoinOption(createOption(defaultBase));

    codes.forEach((code) => appendCoinOption(createOption(code)));
}

export function hightlightCurrentBase(current) {
    const color = 'bg-zinc-200';
    const rows = [...document.querySelectorAll('.row')];
    const old = rows.find((el) => el.classList.contains(`${color}`));
    const currentEl = rows.find((el) => el.getAttribute('data-code') === current);

    currentEl.querySelector('.rate').textContent = '1';
    currentEl.classList.add(`${color}`);

    if (old !== undefined && old !== currentEl) {
        old.classList.remove(('bg-zinc-200'));
    }
}

export function highlightError(elementID) {
    const element = document.getElementById(`${elementID}`);

    element.classList.add('border-2');
    element.classList.add('border-red-500');

    setTimeout(() => {
        element.classList.remove('border-2');
        element.classList.remove('border-red-500');
    }, 3000);
}

function createRow(coinData, flags) {
    const row = document.getElementById('list-row').content.cloneNode(true);
    const rateEl = row.querySelector('.rate');
    const [code, rate] = [...coinData];

    row.querySelector('.code').textContent = code;
    row.querySelector('.flag').firstChild.src = flags(code);
    row.querySelector('tr').setAttribute('data-code', code);
    rateEl.textContent = (Number(rate).toFixed(4));

    return row;
}

function appendRow(row) {
    const $tableBody = document.getElementById('table-body');
    $tableBody.appendChild(row);
}

function updateTable(newRates) {
    const $rates = document.querySelectorAll('.rate');

    $rates.forEach((el, i) => el.textContent = newRates[i]);
}

function updateConvertionValues() {
    const amount = Number(document.getElementById('convertion-amount').value);

    if (!isPositiveNumber(amount)) {
        highlightError('convertion-amount');
        return;
    }
    const $rates = [...document.querySelectorAll('.rate')];
    const $values = document.querySelectorAll('.value');

    const rates = $rates.map((el) => Number(el.textContent));

    $values.forEach((el, i) => (el.textContent = (amount * rates[i]).toFixed(4)));
}

export function watchAmountChanges() {
    document.getElementById('convertion-amount').addEventListener('input', updateConvertionValues);
}

export function populateTable(rates, flags, defaultBase) {
    appendRow(createRow([`${defaultBase}`, 0], flags));

    Object.entries(rates).forEach((rate) => appendRow(createRow(rate, flags)));
}

export function makeChanges(date, newRates, currency) {
    updateDate(date);
    updateTable(Object.values(newRates));
    hightlightCurrentBase(currency);
}
