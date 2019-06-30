/* eslint-disable no-console */
const Tax = require('../lib').default;

const tax = new Tax();
const { chargeBreakDowns, ...calculate } = tax.calculate(4000);

console.table(calculate);
console.table(chargeBreakDowns);
