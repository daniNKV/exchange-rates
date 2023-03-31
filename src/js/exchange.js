export const DEFAULT_BASE = 'ARS';

export async function getRates(base = DEFAULT_BASE) {
    const response = await fetch(`.netlify/functions/get-rates?base=${base}`);
    const rates = await response.json();
    
    return rates.exchange_rates;
}

export async function getHistoricalRates(date, base = DEFAULT_BASE) {
    // date format = YYYY/MM/DD
    const response = await fetch(`.netlify/functions/get-historical-rates?base=${base}&date=${date}`);
    const rates = await response.json();
    
    return rates.exchange_rates;
}

export function retrieveFlagSource(ALPHA_CODE_3) {
    return `https://flagcdn.com/28x21/${parseToAlpha2(ALPHA_CODE_3)}.webp`;
}


function parseToAlpha2(ALPHA_3) {
    return `${ALPHA_3.slice(0,2).toLowerCase()}`;
}
