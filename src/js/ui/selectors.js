function createOption(code) {
    const $coinOptionTemplate = document.getElementById('coin-option').cloneNode(true);
    const option = $coinOptionTemplate.content.querySelector('option');

    option.value = code;
    option.textContent = code;

    return option;
}

function appendCoinOption(option) {
    const $coinsList = document.getElementById('base-coin');

    $coinsList.appendChild(option);
}

// https://flagcdn.com/en/codes.json TODO: USE NAMES INSTEAD OF ISO-ALPHA-CODES-3
export function fillSelectors(base, rates) {
    appendCoinOption(createOption(base));

    rates.forEach((rate) => appendCoinOption(createOption(rate.code)));
}

export function getChanges() {
    return {
        date: document.getElementById('date-input').value,
        currency: document.getElementById('base-coin').value,
    };
}

export function setInputDate(date) {
    const $dateInput = document.getElementById('date-input');
    $dateInput.max = date;
    $dateInput.value = date;
}
