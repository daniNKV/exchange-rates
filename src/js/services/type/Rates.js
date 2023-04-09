export default class Rates {
    constructor(base = 'Undefined', rates = {}, date = '', callback = () => 'Undefined') {    
        this.base = base;
        this.coins = Object.entries(rates).map((rate) => new Rate({ code: rate[0], value: rate[1] }));;
        this.date = date;
        this.flags_source = callback;
    }
}
class Rate {
    constructor({ code = 'Undefined', value = 0}) {
        this.code = code;
        this.value = value;
    }


}