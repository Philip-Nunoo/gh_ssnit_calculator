// @flow
import { Decimal } from 'decimal.js';
import Rates from './rates';

type RateTypenumber = {
  idx: number,
  percentage: number,
  amount: number
};

type ConfigType = {
  ssnit: number,
  monthly: RateTypenumber[],
  annual: RateTypenumber[]
};

type OptionsType = {
  annual: boolean,
};

type ChargeBreakdownType = {
  tableAmount?: number,
  percentage?: number,
  taxableAmount?: number,
  payable?: number,
};

const dt = new Date();
const year = dt.getFullYear() + 1;

const getPayable = (amount: number, percentage: number): number => (
  (percentage / 100) * amount
);

class Tax {
  ssnitRate: number = 5.5;

  rates: RateTypenumber[] = [];

  constructor(rates: ConfigType = Rates[year] || Rates['2019'], options: OptionsType = { annual: false }) {
    this.rates = rates[options.annual ? 'annual' : 'monthly'];
    this.ssnitRate = rates.ssnit;
  }

  calculate(gross: number = 0, allowance: number = 0): {
      totalTax: number,
      ssnitContribution: number,
      net: number,
      chargeBreakDowns: ChargeBreakdownType[],
  } {
    const baseRates = this.rates;
    const ssnitContribution = this.getSsnitContribution(gross);
    let tableAmount = (new Decimal(gross) - ssnitContribution) + allowance;
    let totalTax = 0;

    baseRates.sort((a, b) => (a.idx < b.idx ? -1 : 1));

    const chargeBreakDowns = baseRates.reduce((acc, value) => {
      if (tableAmount > 0) {
        const { percentage, amount } = value;// [i];
        const taxableAmount = tableAmount > amount ? amount : tableAmount;
        const payable = getPayable(taxableAmount, percentage);
        const chargeBreakDown = {
          tableAmount,
          percentage,
          taxableAmount,
          payable,
        };

        totalTax += payable;
        tableAmount -= taxableAmount;
        acc.push(chargeBreakDown);
      }
      return acc;
    }, []);

    const net = gross + allowance - totalTax - ssnitContribution;

    return {
      totalTax,
      ssnitContribution,
      net,
      chargeBreakDowns,
    };
  }

  /**
   */
  getSsnitContribution(gross: number): number {
    return new Decimal(gross)
      .times(this.ssnitRate)
      .dividedBy(100).toNumber(2);
  }
}

export default Tax;
