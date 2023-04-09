const DEFAULT_BASE = 'ARS';
import { getActual, getHistorical } from './api.js';

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


