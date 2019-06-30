// @flow
import { Decimal } from 'decimal.js';

class Tax {
    ssnitRate: number = 5.5;

    constructor() {
        this.ssnitRate = 5.5;
    }

    calculateTax() {

    }

    /**
     */
    getSsnitContribution(grossIncome: number) {
        return new Decimal(grossIncome)
            .times(this.ssnitRate)
            .dividedBy(100).toNumber(2);
        
    }
}

export default Tax;