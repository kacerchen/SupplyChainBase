/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');
const Helper = require('../ledger-api/helper.js');

// ProcessNet specifc classes
const Order = require('./order.js');
const OrderList = require('./orderlist.js');

/**
 * A custom context provides easy access to list of all orders
 */
class OrderContext extends Context {

    constructor() {
        super();
        // All orders are held in a list of order
        this.orderList = new OrderList(this);
    }

}

/**
 * Define order smart contract by extending Fabric Contract class
 *
 */
class OrderContract extends Contract {
    constructor() {
        // Chaincode id is processcontract, same as file name
        // Here define smart contract name as 'org.processnet.order'
        super('org.processnet.order');
        this.helper = new Helper();
    }

    /**
     * Define a custom context for order
    */
    createContext() {
        return new OrderContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }

    async initOrderLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const orders = [
            {
                class: 'org.processnet.order',
                createdTime: '1553521600',
                currentState: "1",
                orderID: '1',
                orderer: 'CVS',
                assuranceObj: {specs: 'N/A', qualifiedOperator: 'N/A', methods: 'N/A', leadTime: 'N/A'},
                productObj: {name: 'drugA', price: '1350', productID: '4', weight: '350'},
                shippingObj: {address: '160 Pleasant st., Malden, MA', dispatchDate: 'ship in 15 days', orderer: 'CVS', shipMethod: 'sea express', tradeTerm: 'FCA'},
                paymentObj: {initPayment: '500', payMethod: 'mastercard', totalAmount: '1350'},
                type: '1',
                receiver: 'MagnetoCorp',
            },
            {
                class: 'org.processnet.order',
                createdTime: '1552521600',
                currentState: '2',
                orderID: '2',
                orderer: 'CVS',
                assuranceObj: {specs: 'some specs...', qualifiedOperator: 'need operator get C license', methods: 'follow our SOP', leadTime: '1 months'},
                productObj: {name: 'drugA', price: '1350', productID: '4', weight: '350'},
                shippingObj: {address: 'Beacon st., Boston, MA', dispatchDate: 'ship in 2 days', orderer: 'CVS', shipMethod: 'air express', tradeTerm: 'FCA'},
                paymentObj: {initPayment: '500', payMethod: 'visa', totalAmount: '1350',},
                type: '2',
                receiver: 'MagnetoCorp',
            },
            {
                class: 'org.processnet.order',
                createdTime: '1553521600',
                currentState: "1",
                orderID: '3',
                orderer: 'CVS',
                assuranceObj: {specs: 'N/A', qualifiedOperator: 'N/A', methods: 'N/A', leadTime: 'N/A'},
                productObj: {name: 'drugA', price: '1350', productID: '6', weight: '350'},
                shippingObj: {address: '70 Pleasant st., Boston, MA', dispatchDate: 'ship in 30 days', orderer: 'CVS', shipMethod: 'air express', tradeTerm: 'FCA'},
                paymentObj: {initPayment: '500', payMethod: 'mastercard', totalAmount: '1350'},
                type: '1',
                receiver: 'MagnetoCorp',
            },
        ];

        for (let i = 0; i < orders.length; i++) {
            orders[i].docType = 'order';
            let key = ctx.orderList.name + '"' + orders[i].orderID + '"';
            await ctx.stub.putState(key, Buffer.from(JSON.stringify(orders[i])));
            console.info('Added <--> ', orders[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    /**
     * Init order
     *
     * @param {Context} ctx the transaction context
     * @param {Integer} type type of the order
     * @param {Integer} orderID order unique id
     * @param {String} name name of the order
     * @param {String} weight weight of the order
     * @param {String} price price of the order
     * @param {Integer} specs specs of the trade assurance
     * @param {String} qualifiedOperator assign qualified operator in trade assurance
     * @param {String} methods assign methods in trade assurance
     * @param {String} leadTime assign lead time in trade assurance
     * @param {String} address shipping address
     * @param {String} shipMethod shipping method
     * @param {String} tradeTerm shipping trade term
     * @param {String} dispatchDate shipping dispatch date
     * @param {String} createdTime time of the order created
     * @param {String} orderer orderer's enrolled username
     * @param {String} receiver receiver's enrolled username
    */
    async initOrder(ctx, orderID, type, 
        productID, name, weight, price, 
        specs, qualifiedOperator, methods, leadTime, 
        address, shipMethod, tradeTerm, dispatchDate, 
        totalAmount, initPayment, payMethod, 
        createdTime, orderer, receiver) {

        // create a new order ID
        console.log(ctx);
        console.log('----------------------')
        console.log(ctx.orderList);

        // create an instance of the order
        let order = Order.createInstance(orderID, type,
            productID, name, weight, price, 
            specs, qualifiedOperator, methods, leadTime, 
            address, shipMethod, tradeTerm, dispatchDate, 
            totalAmount, initPayment, payMethod, 
            createdTime, orderer, receiver);

        // Smart contract, rather than order, moves order into INIT state
        order.setInit();

        // Add the order to the list of all similar orders in the ledger world state
        let key = await ctx.orderList.addOrder(order);
        console.log('This is the return key: ' + key);

        // Must return a serialized order to caller of smart contract
        return order.toBuffer();
    }

    /**
     * MOdify order status
     *
     * @param {Context} ctx the transaction context
     * @param {Integer} type type of the order
     * @param {Integer} orderID order unique id
     * @param {String} name name of the order
     * @param {String} weight weight of the order
     * @param {String} price price of the order
     * @param {Integer} specs specs of the trade assurance
     * @param {String} qualifiedOperator assign qualified operator in trade assurance
     * @param {String} methods assign methods in trade assurance
     * @param {String} leadTime assign lead time in trade assurance
     * @param {String} address shipping address
     * @param {String} shipMethod shipping method
     * @param {String} tradeTerm shipping trade term
     * @param {String} dispatchDate shipping dispatch date
     * @param {String} updatedTime time of the order updated
     * @param {String} orderer orderer's enrolled username
     * @param {String} receiver receiver's enrolled username
     * @param {String} modifier modifier's enrolled username
    */
    async modifyOrder(ctx, orderID,
        productID, newProductID, newName, newWeight, newPrice, 
        newSpecs, newQualifiedOperator, newMethods, newLeadTime, 
        newAddress, newShipMethod, newTradeTerm, newDispatchDate, 
        newTotalAmount, newInitPayment, newPayMethod, 
        updatedTime, orderer, modifier, newState) 
        {

        // Retrieve the current order using key fields provided
        let orderKey = Order.makeKey([orderID]);
        console.log(orderKey);
        let order = await ctx.orderList.getOrder(orderKey);

        // Validate current owner
        if (order.getOrderer() !== modifier && order.getReceiver() !== modifier) {
            throw new Error('Order ' + orderKey + ' cannot be modified by ' + modifier);
        }

        // Change ownership
        if (order.currentState != "1" && order.currentState != "4" && order.currentState != "5") {
            throw new Error('Order contract ' + orderKey + ' is signed by both orgs. Cannot modified!');
        }

        if(order.type == "2") {
            order.setAssuranceDetails(newSpecs, newQualifiedOperator, newMethods, newLeadTime);
        }

        order.setProductDetails(newProductID, newName, newWeight, newPrice);
        order.setShippingDetails(newAddress, newShipMethod, newTradeTerm, newDispatchDate);
        order.setPaymentDetails(newTotalAmount, newInitPayment, newPayMethod);

        // Update state 
        switch (newState) {
            case "4":
                order.setPendingCreator();
                break;
            case "5":
                order.setPendingReceiver();
                break;
        }

        order.setUpdateTime(updatedTime);

        // Update the order
        await ctx.orderList.updateOrder(order);
        return order.toBuffer();
    }

    /**
     * MOdify order status
     *
     * @param {Context} ctx the transaction context
     * @param {Integer} type type of the order
     * @param {Integer} orderID order unique id
     * @param {String} name name of the order
     * @param {String} weight weight of the order
     * @param {String} price price of the order
     * @param {Integer} specs specs of the trade assurance
     * @param {String} qualifiedOperator assign qualified operator in trade assurance
     * @param {String} methods assign methods in trade assurance
     * @param {String} leadTime assign lead time in trade assurance
     * @param {String} address shipping address
     * @param {String} shipMethod shipping method
     * @param {String} tradeTerm shipping trade term
     * @param {String} dispatchDate shipping dispatch date
     * @param {String} updatedTime time of the order updated
     * @param {String} orderer orderer's enrolled username
     * @param {String} receiver receiver's enrolled username
     * @param {String} modifier modifier's enrolled username
    */
    async updateOrder(ctx, orderID, productID, updatedTime, orderer, modifier, newState) 
        {

        // Retrieve the current order using key fields provided
        let orderKey = Order.makeKey([orderID]);
        let order = await ctx.orderList.getOrder(orderKey);

        // Validate current owner
        if (order.getOrderer() !== modifier && order.getReceiver() !== modifier) {
            throw new Error('Order ' + orderKey + ' cannot be modified by ' + modifier);
        }

        // Update state 
        switch (newState) {
            case "2":
                if(order.getOrderer() == modifier) {
                    order.setAccepted();
                    break;
                }
            case "3":
                if(order,getOrderer() == modifier) {
                    order.setAbandoned();
                    break;
                }
            case "6":
                if(order.getReceiver() == modifier) {
                    order.setProcessing();
                    break;
                }
            case "7":
                if(order.getReceiver() == modifier) {
                    order.setShipOut();
                    break;
                }
        }

        order.setUpdateTime(updatedTime);

        // Update the order
        await ctx.orderList.updateOrder(order);
        return order.toBuffer();
    }

    async queryAllOrders(ctx, orderID) {
        let orderKey = Order.makeKey([orderID]);
        console.log('This is orderKey: ' + orderKey);
        let endOrderID = toString(parseInt(orderID) + 999);

        const startKey = ctx.orderList.name + orderKey;
        const endKey = ctx.orderList.name + Order.makeKey([endOrderID]);

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        return this.helper.print(iterator, allResults);
    }

    async queryOrder(ctx, orderID) {
        let orderKey = Order.makeKey([orderID]);
        console.log('This is orderKey: ' + orderKey);
        const stateKey = ctx.orderList.name + orderKey;

        const result = await ctx.stub.getState(stateKey);

        return result;
    }

    async getHistoryByKey(ctx, orderID) {
        const key = ctx.orderList.name + Order.makeKey([orderID]);
        const iterator = await ctx.stub.getHistoryForKey(key);

        const allResults = [];
        return this.helper.print(iterator, allResults);
    }
}

module.exports.OrderContract = OrderContract;

/*
 * SPDX-License-Identifier: Apache-2.0
 * 
 */

// 'use strict';

// const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                color: 'blue',
                make: 'Toyota',
                model: 'Prius',
                owner: 'Tomoko',
            },
            {
                color: 'red',
                make: 'Ford',
                model: 'Mustang',
                owner: 'Brad',
            },
            {
                color: 'green',
                make: 'Hyundai',
                model: 'Tucson',
                owner: 'Jin Soo',
            },
            {
                color: 'yellow',
                make: 'Volkswagen',
                model: 'Passat',
                owner: 'Max',
            },
            {
                color: 'black',
                make: 'Tesla',
                model: 'S',
                owner: 'Adriana',
            },
            {
                color: 'purple',
                make: 'Peugeot',
                model: '205',
                owner: 'Michel',
            },
            {
                color: 'white',
                make: 'Chery',
                model: 'S22L',
                owner: 'Aarav',
            },
            {
                color: 'violet',
                make: 'Fiat',
                model: 'Punto',
                owner: 'Pari',
            },
            {
                color: 'indigo',
                make: 'Tata',
                model: 'Nano',
                owner: 'Valeria',
            },
            {
                color: 'brown',
                make: 'Holden',
                model: 'Barina',
                owner: 'Shotaro',
            },
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, make, model, color, owner) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

}

module.exports.FabCar = FabCar;