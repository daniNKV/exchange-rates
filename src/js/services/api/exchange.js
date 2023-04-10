import { getActual, getHistorical } from './api.js';

const DEFAULT_BASE = 'ARS';

function getFlagSource(ALPHA_CODE_3) {
    const parseToAlpha2 = (ALPHA_3) => ALPHA_3.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/28x21/${parseToAlpha2(ALPHA_CODE_3)}.webp`;
}

export default async function fetchRates(base = DEFAULT_BASE, date = '') {
    const rates = date
        ? await getHistorical(base, date)
        : await getActual(base);
    return {
        base: rates.base,
        coins: rates.exchange_rates,
        date: rates.last_updated,
        flagSource: getFlagSource,
    };
}
