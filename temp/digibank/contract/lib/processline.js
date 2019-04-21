/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('../ledger-api/state.js');

// Enumerate process line state values
const cpState = {
    INIT: 1,
    FEEDING: 2,
    REACTING: 3,
    TRANSIT: 4,
    END: 5
};

/**
 * ProcessLine class extends State class
 * Class will be used by application and smart contract to define a process line
 */
class ProcessLine extends State {

    constructor(obj) {
        super(ProcessLine.getClass(), [obj.manufacturer, obj.expectedProduct, obj.lotNumber]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getManufacturer() {
        return this.manufacturer;
    }

    setUpdateProcess(newComponent, newContainerID, updatedTime, newWeight, newTemperature) {
        this.component = newComponent;
        this.containerID = newContainerID;
        this.createdTime = updatedTime;
        this.weight = newWeight;
        this.temperature = newTemperature;
    }

    /**
     * Useful methods to encapsulate process line states
     */
    setInit() {
        this.currentState = cpState.INIT;
    }

    setFeeding() {
        this.currentState = cpState.FEEDING;
    }

    setReacting() {
        this.currentState = cpState.REACTING;
    }

    setTransit() {
        this.currentState = cpState.TRANSIT;
    }

    setEnd() {
        this.currentState = cpState.END;
    }

    isInit() {
        return this.currentState === cpState.INIT;
    }

    isFeeding() {
        return this.currentState === cpState.FEEDING;
    }

    isReacting() {
        return this.currentState === cpState.REACTING;
    }

    isTransit() {
        return this.currentState === cpState.TRANSIT;
    }

    isEnd() {
        return this.currentState === cpState.END;
    }

    static fromBuffer(buffer) {
        return ProcessLine.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to process line
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, ProcessLine);
    }

    /**
     * Factory method to create a process line object
     */
    static createInstance(lotNumber, component, containerID, manufacturer, createdTime, weight, temperature, expectedProduct) {
        return new ProcessLine({ lotNumber, component, containerID, manufacturer, createdTime, weight, temperature, expectedProduct });
    }

    static getClass() {
        return 'org.processnet.processline';
    }
}

module.exports = ProcessLine;
