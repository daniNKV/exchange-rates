const DEFAULT_BASE = "ARS" ;

async function getRates() {
    const response = await fetch(`https://exchange-rates.abstractapi.com/v1/live/?api_key=${config.API_KEY}&base=${DEFAULT_BASE}`);
    const rates = await response.json();

    return rates.exchange_rates;
}

async function getFlags($code){
    const response = await fetch(`https://countryflagsapi.com/svg/${$code} `)
    const flag = response;

    return flag;
}

async function initialize() {

}

function appendCoinOption(coinCode) {
    const $coinsList = document.getElementById('base-coin');
    $coinsList.appendChild(createOption(coinCode));
    
    return
}

function createOption(code) {
    const $coinOptionTemplate = document.getElementById('coin-option').cloneNode(true);
    const option = $coinOptionTemplate.content.querySelector('option')
    option.value = code;
    option.textContent = code;
    return option
}

