/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// const cpcontract = require('./lib/papercontract.js');
// module.exports.contracts = [cpcontract];

const ProcessLineContract = require('./lib/papercontract').ProcessLineContract;
const ProductContract = require('./lib/papercontract').ProductContract;

module.exports.ProcessLineContract = ProcessLineContract;
module.exports.ProductContract = ProductContract;
module.exports.contracts = [ ProcessLineContract, ProductContract ];