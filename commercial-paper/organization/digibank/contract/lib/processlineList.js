/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('../ledger-api/statelist.js');

const ProcessLine = require('./processline.js');

class ProcessLineList extends StateList {

    constructor(ctx) {
        super(ctx, 'org.processnet.processlinelist');
        this.use(ProcessLine);
        this.ledgerkeys = [];
    }

    async addProcessline(processline) {
        return this.addState(processline);
    }

    async getProcessline(processlineKey) {
        return this.getState(processlineKey);
    }

    async updateProcessline(processline) {
        return this.updateState(processline);
    }

    setLedgerkeys(key, value) {
        let obj = {};
        obj[key] = value;
        this.ledgerkeys.push(obj);
    }

    getLedgerkeys() {
        return this.ledgerkeys;
    }
}


module.exports = ProcessLineList;