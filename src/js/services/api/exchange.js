const DEFAULT_BASE = 'ARS';

async function getActualRates(base) {
    const response = await fetch(`.netlify/functions/get-rates?base=${base}`);
    return await response.json().exchange_rates;
}

async function getHistoricalRates(date, base) {
    // date format = YYYY/MM/DD
    const response = await fetch(`.netlify/functions/get-historical-rates?base=${base}&date=${date}`);
    return await response.json().exchange_rates;
}

export function getFlagSource(ALPHA_CODE_3) {
    const parseToAlpha2 = (ALPHA_3) => ALPHA_3.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/28x21/${parseToAlpha2(ALPHA_CODE_3)}.webp`;
}

export default async function getRates(base = DEFAULT_BASE, date = undefined) {
    return date 
        ? getHistoricalRates(date, base) 
        : getActualRates(base);
}

