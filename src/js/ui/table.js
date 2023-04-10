import { isPositiveNumber, highlightError } from './utils.js';

function createRow(coin) {
    const row = document.getElementById('list-row').content.cloneNode(true);
    const rateEl = row.querySelector('.rate');
    const { code, value, imageUrl } = coin;
    row.querySelector('.code').textContent = code;
    row.querySelector('.flag').firstChild.src = imageUrl;
    row.querySelector('tr').setAttribute('data-code', code);
    rateEl.textContent = (Number(value).toFixed(4));
    return row;
}

function appendRow(row) {
    const $tableBody = document.getElementById('table-body');
    $tableBody.appendChild(row);
}

function makeRows(rates) {
    rates.map((rate) => appendRow(createRow(rate)));
}

export function updateTable(newRates) {
    const $rates = document.querySelectorAll('.rate');
    /* eslint no-return-assign: "off" */
    newRates.forEach((rate, i) => $rates[i].textContent = rate.value.toFixed(4));
}

export function updateConvertionValues() {
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

export function hightlightCurrentBase(current) {
    const color = 'bg-zinc-200';
    const rows = [...document.querySelectorAll('.row')];
    const old = rows.find((el) => el.classList.contains(color));
    const currentEl = rows.find((el) => el.getAttribute('data-code') === current);
    currentEl.querySelector('.rate').textContent = '1';
    currentEl.classList.add(color);

    if (old !== undefined && old !== currentEl) {
        old.classList.remove((color));
    }
}

export function setTableDate(date) {
    const $tableDate = document.getElementById('table-date');
    $tableDate.textContent = date;
}

export function populateTable(base, rates) {
    makeRows(rates);
    hightlightCurrentBase(base);
}
