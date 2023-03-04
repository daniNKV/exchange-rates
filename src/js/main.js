

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
    fillBaseSelector(Object.keys(actualRates));
    populateTable(actualRates);

    return
}


function createOption(code) {
    const $coinOptionTemplate = document.getElementById('coin-option').cloneNode(true);
    const option = $coinOptionTemplate.content.querySelector('option')
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
    codes.forEach(code => appendCoinOption(createOption(code)));

    return
}


function createRow(coinData) {
    const flagSource = `https://flagcdn.com/28x21/${coinData[0].slice(0,2).toLowerCase()}.webp`
    const $rowTemplate = document.getElementById('list-row').content.cloneNode(true);

    $rowTemplate.getElementById('code').textContent = coinData[0];
    $rowTemplate.getElementById('rate').textContent = coinData[1];
    $rowTemplate.getElementById('flag').firstChild.src = flagSource;

    return $rowTemplate;
}


function appendRow(row) {
    const $tableBody = document.getElementById('table-body');
    $tableBody.appendChild(row);

    return
}


function populateTable(rates) {
    Object.entries(rates).forEach(rate => appendRow(createRow(rate)))

    return
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