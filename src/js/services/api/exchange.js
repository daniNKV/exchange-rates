const DEFAULT_BASE = 'ARS';

async function getActual(base = DEFAULT_BASE) {
    const response = await fetch(`.netlify/functions/get-rates?base=${base}`);
    return await response.json();
}

async function getHistorical(date, base = DEFAULT_BASE) {
    // date format = YYYY/MM/DD
    console.log(getHistorical)
    const response = await fetch(`.netlify/functions/get-historical-rates?base=${base}&date=${date}`);
    return await response.json();
}

export async function getRates(base = DEFAULT_BASE, date = '') {
    const rates = date 
        ? await getHistorical(date, base) 
        : await getActual(base);
    return rates;
}

export function getFlagSource(ALPHA_CODE_3) {
    const parseToAlpha2 = (ALPHA_3) => ALPHA_3.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/28x21/${parseToAlpha2(ALPHA_CODE_3)}.webp`;
}


