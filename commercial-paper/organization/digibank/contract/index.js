/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// const cpcontract = require('./lib/papercontract.js');
// module.exports.contracts = [cpcontract];

const ProcessLineContract = require('./lib/processcontracts').ProcessLineContract;
const ProductContract = require('./lib/processcontracts').ProductContract;
const OrderContract = require('./lib/processcontracts').OrderContract;

module.exports.ProcessLineContract = ProcessLineContract;
module.exports.ProductContract = ProductContract;
module.exports.OrderContract = OrderContract;
// module.exports.contracts = [ ProcessLineContract, ProductContract, OrderContract ];

const FabCar = require('./lib/processcontracts').FabCar;

module.exports.FabCar = FabCar;
module.exports.contracts = [ FabCar, ProcessLineContract, ProductContract, OrderContract ];