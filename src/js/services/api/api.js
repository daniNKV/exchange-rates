const API_URL = '.netlify/functions/get-rates';

export function getFlagSource(ALPHA_CODE_3) {
    const parseToAlpha2 = (ALPHA_3) => ALPHA_3.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/28x21/${parseToAlpha2(ALPHA_CODE_3)}.webp`;
}

export async function getActual(base = '') {
    const response = await fetch(`${API_URL}?base=${base}`);
    const rates = await response.json();
    return rates;
}

export async function getHistorical(base = '', date = '') {
    // date format = YYYY/MM/DD
    const response = await fetch(`${API_URL}?base=${base}&date=${date}`);
    const rates = await response.json();
    return rates;
}
