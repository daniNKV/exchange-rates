export function highlightError(elementID) {
    const DELAY_IN_MS = 3000;
    const element = document.getElementById(`${elementID}`);

    element.classList.add('border-2');
    element.classList.add('border-red-500');

    setTimeout(() => {
        element.classList.remove('border-2');
        element.classList.remove('border-red-500');
    }, DELAY_IN_MS);
}

export function isPositiveNumber(number) {
    return number >= 0 && typeof (number) === 'number';
}

export function dateIsValid(date) {
    const actualDate = new Date();
    const isBeforeToday = (Date.parse(actualDate) - Date.parse(date)) > 0;

    return isBeforeToday;
}

export function parseDate(timestamp) {
    const UNIX_TO_MS = (num) => num * 1000;
    const date = new Date(UNIX_TO_MS(timestamp));
    const day = date.getDate();
    const month = date.getMonth();
    // Adds 0 to match the 0X format on single digit numbers
    return `${date.getFullYear()}-${month < 9 ? `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` : day}`;
}

export function validateChanges(input) {
    if (dateIsValid(input.date)) {
        return true;
    }
    highlightError('date-input');
    return false;
}
