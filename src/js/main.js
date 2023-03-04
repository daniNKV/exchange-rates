

async function getRates(base = config.DEFAULT_BASE) {
    const response = await fetch(`https://exchange-rates.abstractapi.com/v1/live/?api_key=${config.API_KEY}&base=${base}`);
    const rates = await response.json();

    return rates.exchange_rates;
}

async function getHistoricRates(date, base = config.DEFAULT_BASE) {
    // date format = 2020-08-31
    const response = await fetch(`https://exchange-rates.abstractapi.com/v1/historical?api_key=${config.API_KEY}&base=${base}&date=${date}`);
    const rates = await response.json();

    return rates.exchange_rates;
}

async function initialize() {
    // const actualRates = await getRates();
    const actualRates = getMockRates();
    const actualDate = parseDate(new Date());
    showActualDate(actualDate);
    fillBaseSelector(Object.keys(actualRates));
    populateTable(actualRates);
    watchAmountChanges();

    return
}

function showActualDate(date) {
    const $dateInput = document.getElementById('actual-date');
    const $tableDate = document.getElementById('table-date');
    $tableDate.textContent = date;
    $dateInput.max = date;
    $dateInput.value = date;
    
    return
}

// Convert from YYYY/MM/DD to YYYY/DD/MM
function parseDate(date) {
    const day = date.getDate();
    const month = date.getMonth();
    // Adds 0 to match the 0X format on single digit numbers 
    return `${date.getFullYear()}-${month < 9 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`;
}

function createOption(code) {
    const $coinOptionTemplate = document.getElementById('coin-option').cloneNode(true);
    const option = $coinOptionTemplate.content.querySelector('option');
    option.value = code;
    option.textContent = code;

    return option
}


function appendCoinOption(option) {
    const $coinsList = document.getElementById('base-coin');
    $coinsList.appendChild(option);
    
    return
}


function fillBaseSelector(codes) {
    // https://flagcdn.com/en/codes.json TODO: USE NAMES INSTEAD OF ISO-ALPHA-CODES-3
    codes.forEach(code => appendCoinOption(createOption(code)));

    return
}


function retrieveFlagSource(ALPHA_CODE_3) {
    return `https://flagcdn.com/28x21/${parseToAlpha2(ALPHA_CODE_3)}.webp`
}

function parseToAlpha2(ALPHA_3) {
    return `${ALPHA_3.slice(0,2).toLowerCase()}`
}
 
function createRow(coinData) {
    const row = document.getElementById('list-row').content.cloneNode(true);
    const [code, rate] = [...coinData];

    row.querySelector('.code').textContent = code;
    row.querySelector('.rate').textContent = rate.toFixed(4);
    row.querySelector('.flag').firstChild.src = retrieveFlagSource(code);

    return row;
}

function appendRow(row) {
    const $tableBody = document.getElementById('table-body');
    $tableBody.appendChild(row);

    return
}


function populateTable(rates) {
    Object.entries(rates).forEach(rate => appendRow(createRow(rate)));

    return
}


function updateConvertionValues() {
    const amount = Number(document.getElementById('convertion-amount').value);
    const $rates = [...document.querySelectorAll('.rate')];
    const $values = document.querySelectorAll('.value');
    
    const rates = $rates.map(el => Number(el.textContent));
    
    $values.forEach((el, i) => el.textContent = (rates[i] * amount).toFixed(4) )

    return
}

function watchAmountChanges() {
    document.getElementById('convertion-amount').addEventListener('input', updateConvertionValues)
}


document.addEventListener('load', initialize())

function getMockRates() {
    return {
        "EUR": 0.012516,
        "USD": 0.013286,
        "JPY": 1.809172,
        "BGN": 0.024479,
        "CZK": 0.294224,
        "DKK": 0.093133,
        "GBP": 0.01108,
        "HUF": 4.739892,
        "PLN": 0.058925,
        "RON": 0.061622,
        "SEK": 0.139465,
        "CHF": 0.012463,
        "ISK": 1.881138,
        "NOK": 0.138438,
        "HRK": 0.093875,
        "RUB": 1.39499,
        "TRY": 0.251104,
        "AUD": 0.019685,
        "BRL": 0.069148,
        "CAD": 0.018069,
        "CNY": 0.091774,
        "HKD": 0.104289,
        "IDR": 203.464049,
        "ILS": 0.048703,
        "INR": 1.087862,
        "KRW": 17.312478,
        "MXN": 0.240301,
        "MYR": 0.059467,
        "NZD": 0.021363,
        "PHP": 0.727524,
        "SGD": 0.017893,
        "THB": 0.460347,
        "ZAR": 0.241353,
        "DZD": 1.65334,
        "MAD": 0.117348,
        "TWD": 0.36491,
        "BTC": 0.000001,
        "ETH": 0.00001,
        "BNB": 0.000048,
        "DOGE": 0.22127,
        "XRP": 0.027512,
        "BCH": 0.000114,
        "LTC": 0.000251
      }
}