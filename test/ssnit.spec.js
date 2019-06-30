import { expect } from 'chai';
import Tax from '../src/tax';

describe('Tax' , function() {
    it ('should return 21.34 for 388 grossIncome in ssnit contribution', function() {
        const tax = new Tax();
        const grossIncome = 388;
        const result = tax.getSsnitContribution(grossIncome);
        
        expect(result).to.equal(21.34);
    });
});
