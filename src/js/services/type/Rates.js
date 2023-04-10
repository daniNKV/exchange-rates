import Rate from './Rate.js';

export default class Rates {
    constructor({
        base = 'Undefined',
        rates = [],
        date = '',
        callback = () => 'Undefined',
    }) {
        this.base = base;
        this.coins = rates.map((rate = []) => new Rate(rate[0], rate[1], callback(rate[0])));
        this.date = date;
    }
}
