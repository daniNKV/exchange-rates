const API_URL = '.netlify/functions';

export async function getActual(base) {
    const response = await fetch(`${API_URL}/get-rates?base=${base}`);
    return await response.json();
}

export async function getHistorical(base = '', date = '') {
    // date format = YYYY/MM/DD
    const response = await fetch(`${API_URL}/get-historical-rates?base=${base}&date=${date}`);
    return await response.json();
}