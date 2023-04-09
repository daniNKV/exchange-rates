export function saveRates(rates) {
    if (!rates.base || !rates.date || !rates.coins) throw new Error('Missing parameters to save rates');
    localStorage.setItem(`rates-${rates.base}-${rates.date}`, JSON.stringify(rates.coins));
}

export function getRates(base = '', date = '') {
    if(!base || !date) throw new Error('Missing parameters to get rates');
    return JSON.parse(localStorage.getItem(`rates-${base}-${date}`));

}
