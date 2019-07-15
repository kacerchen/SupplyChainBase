/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('../ledger-api/state.js');

// Enumerate order state values
const cpState = {
    INIT: 1,
    ACCEPTED: 2,
    ABANDONED: 3,
    PENDINGRECEIVER: 4,
    PENDINGCREATOR: 5,
    PROCESSING: 6,
    SHIPOUT:7
};

// Enumerate order type values
const Type = {
    STANDARD: 1,
    CUSTOMIZED: 2,
};

/**
 * Order class extends State class
 * Class will be used by application and smart contract to define an order
 */
class Order extends State {

    constructor(obj, constructWay) {

        if(constructWay == 'Get'){
            return obj;
        }

        super(Order.getClass(), [obj.orderID]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getOrderer() {
        return this.orderer;
    }

    getReceiver() {
        return this.receiver;
    }

    getType() {
        return this.type;
    }

    setProductDetails(newID, newName, newWeight, newPrice) {
        this.productObj.productID = newID;
        this.productObj.name = newName;
        this.productObj.weight = newWeight;
        this.productObj.price = newPrice;
    }

    setAssuranceDetails(newSpecs, newQualifiedOperator, newMethods, newLeadTime) {
        this.assuranceObj.specs = newSpecs;
        this.assuranceObj.qualifiedOperator = newQualifiedOperator;
        this.assuranceObj.methods = newMethods;
        this.assuranceObj.leadTime = newLeadTime;
    }

    setShippingDetails(newAddress, newMethod, newTradeTerm, newTime) {
        this.shippingObj.address = newAddress;
        this.shippingObj.shipMethod = newMethod;
        this.shippingObj.tradeTerm = newTradeTerm;
        this.shippingObj.dispatchDate = newTime;
    }

    setPaymentDetails(newAmount, newInitPay, newMethod) {
        this.paymentObj.totalAmount = newAmount;
        this.paymentObj.initPayment = newInitPay;
        this.paymentObj.payMethod = newMethod;
    }

    setUpdateTime(updatedTime) {
        this.createdTime = updatedTime;
    }

    /**
     * Useful methods to encapsulate order states
     */
    setInit() {
        this.currentState = cpState.INIT;
    }

    setAccepted() {
        this.currentState = cpState.ACCEPTED;
    }

    setAbandoned() {
        this.currentState = cpState.ABANDONED;
    }

    setPendingCreator() {
        this.currentState = cpState.PENDINGCREATOR;
    }

    setPendingReceiver() {
        this.currentState = cpState.PENDINGRECEIVER;
    }

    setProcessing() {
        this.currentState = cpState.PROCESSING;
    }

    setShipOut() {
        this.currentState = cpState.SHIPOUT;
    }

    isInit() {
        return this.currentState === cpState.INIT;
    }

    isAccepted() {
        return this.currentState === cpState.ACCEPTED;
    }

    isAbandoned() {
        return this.currentState === cpState.ABANDONED;
    }

    isPendingCreator() {
        return this.currentState === cpState.PENDINGCREATOR;
    }

    isPendingReceiver() {
        return this.currentState === cpState.PENDINGRECEIVER;
    }

    isProcessing() {
        return this.currentState === cpState.PROCESSING;
    }

    isShipOut() {
        return this.currentState === cpState.SHIPOUT;
    }

    static fromBuffer(buffer) {
        return Order.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to product
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Order);
    }

    static deserializeOrderClass(data, objClass) {
        let json = JSON.parse(data.toString());
        let object = new (objClass)(json, 'Get');
        return object;
    }

    /**
     * Factory method to create a order object
     */
    static createInstance(orderID, type,
        productID, name, weight, price, 
        specs, qualifiedOperator, methods, leadTime, 
        address, shipMethod, tradeTerm, dispatchDate, 
        totalAmount, initPayment, payMethod, 
        createdTime, orderer, receiver) 
        {

        let productObj = {productID, name, weight, price};
        let assuranceObj = {specs, qualifiedOperator, methods, leadTime};
        let shippingObj = {orderer, address, shipMethod, tradeTerm, dispatchDate};
        let paymentObj = {totalAmount, initPayment, payMethod};
        
        if(type == Type.STANDARD) {

            console.log('Run type of STANDARD to new Order.');
            return new Order({ orderID, type, productObj, assuranceObj, shippingObj, paymentObj, createdTime, orderer, receiver }, 'New');
        } else if(type == Type.CUSTOMIZED) {

            console.log('Run type of CUSTOMIZED to new Order.');
            return new Order({ orderID, type, productObj, assuranceObj, shippingObj, paymentObj, createdTime, orderer, receiver }, 'New');
        }
    }

    static getClass() {
        return 'org.processnet.order';
    }
}

module.exports = Order;
