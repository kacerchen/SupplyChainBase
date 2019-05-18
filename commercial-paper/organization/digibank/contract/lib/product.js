/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('../ledger-api/state.js');

// Enumerate product/ raw material state values
const cpState = {
    INIT: 1,
    REPACKAGING: 2,
    READYTOUSE: 3,
    PROCESSING: 4,
    READYTOORDER: 5,
    USED: 6,
    SOLDOUT:7,
    PEND_SHIPPING: 8,
    SHIPOUT: 9
};

// Enumerate product/ raw material type values
const Type = {
    ORIGINAL: 1,
    RAWMATERIAL: 2,
    FINAL: 3
};

/**
 * Product class extends State class
 * Class will be used by application and smart contract to define a product
 */
class Product extends State {

    constructor(obj) {
        super(Product.getClass(), [obj.owner, obj.name, obj.newProductID]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getOwner() {
        return this.owner;
    }

    setNewOwner(newOwner) {
        this.owner = newOwner;
    }

    setUpdateTime(updatedTime) {
        this.createdTime = updatedTime;
    }

    /**
     * Useful methods to encapsulate process line states
     */
    setInit() {
        this.currentState = cpState.INIT;
    }

    setRepackaging() {
        this.currentState = cpState.REPACKAGING;
    }

    setReadyToUse() {
        this.currentState = cpState.READYTOUSE;
    }

    setProcessing() {
        this.currentState = cpState.PROCESSING;
    }

    setReadyToOrder() {
        this.currentState = cpState.READYTOORDER;
    }

    setUsed() {
        this.currentState = cpState.USED;
    }

    setSoldOut() {
        this.currentState = cpState.SOLDOUT;
    }

    setPendShipping() {
        this.currentState = cpState.PEND_SHIPPING;
    }

    setShipOut() {
        this.currentState = cpState.SHIPOUT;
    }

    isInit() {
        return this.currentState === cpState.INIT;
    }

    isRepackaging() {
        return this.currentState === cpState.REPACKAGING;
    }

    isReadyToUse() {
        return this.currentState === cpState.READYTOUSE;
    }

    isProcessing() {
        return this.currentState === cpState.PROCESSING;
    }

    isReadyToOrder() {
        return this.currentState === cpState.READYTOORDER;
    }

    isUsed() {
        return this.currentState === cpState.USED;
    }

    isSoldOut() {
        return this.currentState === cpState.SOLDOUT;
    }

    isPendShipping() {
        return this.currentState === cpState.PEND_SHIPPING;
    }

    isShipOut() {
        return this.currentState === cpState.SHIPOUT;
    }

    static fromBuffer(buffer) {
        return Product.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to product
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Product);
    }

    /**
     * Factory method to create a product object
     */
    static createInstance(newProductID, name, type, from, processline, createdTime, weight, supplier, owner) {

        if(type == Type.ORIGINAL) {

            console.log('Run type of ORIGINAL to new Product.');
            return new Product({ newProductID, name, type, createdTime, weight, owner });
        } else if(type == Type.RAWMATERIAL) {

            console.log('Run type of RAWMATERIAL to new Product.');
            return new Product({ newProductID, name, type, from, createdTime, weight, supplier, owner });
        } else if(type == Type.FINAL) {

            console.log('Run type of FINAL to new Product.');
            return new Product({ newProductID, name, type, processline, createdTime, weight, supplier, owner });
        }
    }

    static getClass() {
        return 'org.processnet.product';
    }
}

module.exports = Product;
