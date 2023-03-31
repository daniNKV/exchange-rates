export function getMockHistoricalRates() {
    return {
        USD: 1.0684,
        JPY: 144.82,
        BGN: 1.9558,
        CZK: 23.426,
        DKK: 7.4431,
        GBP: 0.88574,
        HUF: 373.58,
        PLN: 4.6745,
        RON: 4.9174,
        SEK: 11.1,
        CHF: 0.9997,
        ISK: 151.7,
        NOK: 11.0365,
        TRY: 20.1798,
        AUD: 1.5776,
        BRL: 5.5535,
        CAD: 1.4531,
        CNY: 7.3349,
        HKD: 8.3866,
        IDR: 16273.43,
        ILS: 3.8729,
        INR: 88.0848,
        KRW: 1389.03,
        MXN: 19.4883,
        MYR: 4.7784,
        NZD: 1.7048,
        PHP: 58.762,
        SGD: 1.4316,
        THB: 37.063,
        ZAR: 19.3769,
    };
}

export function getMockRates() {
    return {
        EUR: 0.012516,
        USD: 0.013286,
        JPY: 1.809172,
        BGN: 0.024479,
        CZK: 0.294224,
        DKK: 0.093133,
        GBP: 0.01108,
        HUF: 4.739892,
        PLN: 0.058925,
        RON: 0.061622,
        SEK: 0.139465,
        CHF: 0.012463,
        ISK: 1.881138,
        NOK: 0.138438,
        HRK: 0.093875,
        RUB: 1.39499,
        TRY: 0.251104,
        AUD: 0.019685,
        BRL: 0.069148,
        CAD: 0.018069,
        CNY: 0.091774,
        HKD: 0.104289,
        IDR: 203.464049,
        ILS: 0.048703,
        INR: 1.087862,
        KRW: 17.312478,
        MXN: 0.240301,
        MYR: 0.059467,
        NZD: 0.021363,
        PHP: 0.727524,
        SGD: 0.017893,
        THB: 0.460347,
        ZAR: 0.241353,
        DZD: 1.65334,
        MAD: 0.117348,
        TWD: 0.36491,
        BTC: 0.000001,
        ETH: 0.00001,
        BNB: 0.000048,
        DOGE: 0.22127,
        XRP: 0.027512,
        BCH: 0.000114,
        LTC: 0.000251,
    };
}

export function isPositiveNumber(number) {
    return number >= 0 && typeof (number) === 'number';
}

// Convert from YYYY/MM/DD to YYYY/DD/MM
export function parseDate(date) {
    const day = date.getDate();
    const month = date.getMonth();
    // Adds 0 to match the 0X format on single digit numbers
    return `${date.getFullYear()}-${month < 9 ? `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` : day}`;
}

export function dateIsValid(date) {
    const actualDate = new Date();
    const isBeforeToday = (Date.parse(actualDate) - Date.parse(date)) > 0;

    return isBeforeToday;
}
