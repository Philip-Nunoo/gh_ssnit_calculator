import { expect } from 'chai';
import Tax from '../src/tax';

describe('Tax' , function() {
    it ('should return 21.34 for 388 grossIncome in ssnit contribution', function() {
        const tax = new Tax();
        const grossIncome = 388;
        const result = tax.getSsnitContribution(grossIncome);
        
        expect(result).to.equal(21.34);
    });

    it ('should calculate tax correctly (amount = 0, allowance = 0)', function() {
        const tax = new Tax();
        const result = tax.calculate();

        expect(result.totalTax).to.equal(0);
        expect(result.ssnitContribution).to.equal(0);
        expect(result.net).to.equal(0);
    });

    it ('should calculate tax correctly (amount = 4000, allowance = 3000)', function() {
        const tax = new Tax();
        const gross = 4000;
        const allowance = 300;
        const result = tax.calculate(gross, allowance);

        expect(result.totalTax).to.equal(682);
        expect(result.ssnitContribution).to.equal(220);
        expect(result.net).to.equal(3398);
    });
});
