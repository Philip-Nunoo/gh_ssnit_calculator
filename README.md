# gh_ssnit_calculator

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![dependencies Status](https://david-dm.org/Philip-Nunoo/gh_ssnit_calculator/status.svg)](https://david-dm.org/Philip-Nunoo/gh_ssnit_calculator) [![devDependencies Status](https://david-dm.org/Philip-Nunoo/gh_ssnit_calculator/dev-status.svg)](https://david-dm.org/Philip-Nunoo/gh_ssnit_calculator?type=dev) 
[![Build Status](https://travis-ci.org/Philip-Nunoo/gh_ssnit_calculator.svg?branch=master)](https://travis-ci.org/Philip-Nunoo/gh_ssnit_calculator)
[![Coverage Status](https://coveralls.io/repos/github/Philip-Nunoo/gh_ssnit_calculator/badge.svg?branch=master)](https://coveralls.io/github/Philip-Nunoo/gh_ssnit_calculator?branch=master)



## Installation

```sh
npm i -S gh_ssnit_calculator
```

## Example 

```js
/* eslint-disable no-console */
const Tax = require('../lib').default;

const tax = new Tax();
const { chargeBreakDowns, ...calculate } = tax.calculate(20000);

console.table(calculate);
console.table(chargeBreakDowns);
```

## Tax Rates
[TAX and SSNIT Rates](src/rates.js)
