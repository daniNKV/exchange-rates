export function saveRates({ base = '', date = '', coins = [[]] }) {
    if (!base || !date || !coins) throw new Error('Missing parameters to save rates');
    localStorage.setItem(`rates-${base}-${date}`, JSON.stringify(coins));
}

export function getRates(base = '', date = '') {
    if (!base || !date) throw new Error('Missing parameters to get rates');

    const rates = localStorage.getItem(`rates-${base}-${date}`);

    if (rates === null) {
        throw new Error('Rates not found');
    }
}
