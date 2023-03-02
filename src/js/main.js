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



