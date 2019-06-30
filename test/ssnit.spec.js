import { expect } from 'chai';
import Tax from '../src/tax';

describe('Tax', () => {
  it('should return 21.34 for 388 grossIncome in ssnit contribution', () => {
    const tax = new Tax();
    const grossIncome = 388;
    const result = tax.getSsnitContribution(grossIncome);

    expect(result).to.equal(21.34);
  });

  describe('Monthly calculations', () => {
    it('should calculate tax correctly (amount = 0, allowance = 0)', () => {
      const tax = new Tax();
      const result = tax.calculate();

      expect(result.totalTax).to.equal(0);
      expect(result.ssnitContribution).to.equal(0);
      expect(result.net).to.equal(0);
    });

    it('should calculate tax correctly (amount = 4000, allowance = 3000)', () => {
      const tax = new Tax();
      const gross = 4000;
      const allowance = 300;
      const result = tax.calculate(gross, allowance);

      expect(result.totalTax).to.equal(682);
      expect(result.ssnitContribution).to.equal(220);
      expect(result.net).to.equal(3398);
    });
  });

  describe('Annual calculations', () => {
    it('should calculate tax correctly (amount = 0, allowance = 0)', () => {
      const tax = new Tax(undefined, { annual: true });
      const result = tax.calculate();

      expect(result.totalTax).to.equal(0);
      expect(result.ssnitContribution).to.equal(0);
      expect(result.net).to.equal(0);
    });
  });

  describe('Custom rates calculations', () => {
    it('should calculate tax correctly (amount = 0, allowance = 0)', () => {
      const rates = {
        ssnit: 5.5,
        annual: [],
        monthly: [],
      };

      const tax = new Tax(rates, { annual: true });
      const result = tax.calculate();

      expect(result.totalTax).to.equal(0);
      expect(result.ssnitContribution).to.equal(0);
      expect(result.net).to.equal(0);
    });
  });
});
