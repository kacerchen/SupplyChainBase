/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');
const Helper = require('../ledger-api/helper.js');

// ProcessNet specifc classes
const ProcessLine = require('./processline.js');
const ProcessLineList = require('./processlineList.js');
const Product = require('./product.js');
const ProductList = require('./productlist.js');

/**
 * A custom context provides easy access to list of all process lines
 */
class ProcessLineContext extends Context {

    constructor() {
        super();
        // All process lines are held in a list of process lines
        this.processLineList = new ProcessLineList(this);
    }

}

/**
 * A custom context provides easy access to list of all prducts
 */
class ProductContext extends Context {

    constructor() {
        super();
        // All products are held in a list of products
        this.productList = new ProductList(this);
    }

}

/**
 * Define process line smart contract by extending Fabric Contract class
 *
 */
class ProcessLineContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.processnet.processline');
        this.helper = new Helper();
    }

    /**
     * Define a custom context for process line
    */
    createContext() {
        return new ProcessLineContext();
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

    async initProcessLineLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const processlines = [
            {
                class: 'org.processnet.processline',
                key: '"00001"',
                currentState: '1',
                lotNumber: '00001',
                component: 'componentA',
                containerID: 'CT-123',
                manufacturer: 'MagnetoCorp',
                createdTime: '1552521600',
                weight: '450',
                temperature: '35',
                expectedProduct: 'drugA',
            },
            {
                class: 'org.processnet.processline',
                key: '"00002"',
                currentState: '1',
                lotNumber: '00002',
                component: 'componentB',
                containerID: 'CT-456',
                manufacturer: 'MagnetoCorp',
                createdTime: '1552536600',
                weight: '630',
                temperature: '60',
                expectedProduct: 'drugB',
            },
            {
                class: 'org.processnet.processline',
                key: '"00003"',
                currentState: '2',
                lotNumber: '00003',
                component: 'componentC',
                containerID: 'CT-678',
                manufacturer: 'MagnetoCorp',
                createdTime: '1552621600',
                weight: '140',
                temperature: '23',
                expectedProduct: 'drugC',
            },
            {
                class: 'org.processnet.processline',
                key: '"00004"',
                currentState: '3',
                lotNumber: '00004',
                component: 'componentD',
                containerID: 'CT-912',
                manufacturer: 'MagnetoCorp',
                createdTime: '1552821600',
                weight: '920',
                temperature: '40',
                expectedProduct: 'drugD',
            },
            {
                class: 'org.processnet.processline',
                key: '"00005"',
                currentState: '2',
                lotNumber: '00005',
                component: 'componentE',
                containerID: 'CT-145',
                manufacturer: 'MagnetoCorp',
                createdTime: '1552921600',
                weight: '324',
                temperature: '28',
                expectedProduct: 'drugA',
            },
            {
                class: 'org.processnet.processline',
                key: '"00006"',
                currentState: '2',
                lotNumber: '00006',
                component: 'componentE',
                containerID: 'CT-145',
                manufacturer: 'MagnetoCorp',
                createdTime: '1552921600',
                weight: '324',
                temperature: '28',
                expectedProduct: 'drugA',
            },
            {
                class: 'org.processnet.processline',
                key: '"00007"',
                currentState: '3',
                lotNumber: '00007',
                component: 'componentD',
                containerID: 'CT-912',
                manufacturer: 'iii',
                createdTime: '1552821600',
                weight: '920',
                temperature: '40',
                expectedProduct: 'drugD',
            },
            {
                class: 'org.processnet.processline',
                key: '"00008"',
                currentState: '2',
                lotNumber: '00008',
                component: 'componentE',
                containerID: 'CT-145',
                manufacturer: 'iii',
                createdTime: '1552921600',
                weight: '324',
                temperature: '28',
                expectedProduct: 'drugA',
            },
            {
                class: 'org.processnet.processline',
                key: '"00009"',
                currentState: '2',
                lotNumber: '00009',
                component: 'componentE',
                containerID: 'CT-145',
                manufacturer: 'iii',
                createdTime: '1552921600',
                weight: '324',
                temperature: '28',
                expectedProduct: 'drugA',
            },
        ];

        for (let i = 0; i < processlines.length; i++) {
            processlines[i].docType = 'processline';
            let key = ctx.processLineList.name + '"' + processlines[i].lotNumber + '"';
            await ctx.stub.putState(key, Buffer.from(JSON.stringify(processlines[i])));
            console.info('Added <--> ', processlines[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    /**
     * Init process line
     *
     * @param {Context} ctx the transaction context
     * @param {Integer} lotNumber lot number for final product
     * @param {String} component name of the main component in this process
     * @param {Integer} containerID id for container where the process happened
     * @param {String} manufacturer manufacturer of this process line
     * @param {String} createdTime process created date
     * @param {Integer} weight weight of the main component
     * @param {Integer} temperature avg. temperature within container
     * @param {String} expectedProduct name of final product of this process line
    */
    async initProcessLine(ctx, lotNumber, component, containerID, manufacturer, createdTime, weight, temperature, expectedProduct) {

        // const logger = Client.getLogger('CHAINCODE');
        // create an instance of the process line
        let processline = ProcessLine.createInstance(lotNumber, component, containerID, manufacturer, createdTime, weight, temperature, expectedProduct);

        // Smart contract, rather than processline, moves processline into INIT state
        processline.setInit();

        // Add the process line to the list of all similar process lines in the ledger world state
        let key = await ctx.processLineList.addProcessline(processline);
        console.log('This is the return key: ' + key);
        // logger.info('%s infotext', key);

        ctx.processLineList.setLedgerkeys(key, {manufacturer: manufacturer, expectedProduct: expectedProduct, lotNumber: lotNumber});
        console.log('Key is added to ledgerkeys array.');

        // Must return a serialized process line to caller of smart contract
        return processline.toBuffer();
    }

    /**
     * Update process line status
     *
     * @param {Context} ctx the transaction context
     * @param {Integer} lotNumber lot number for final product
     * @param {String} newComponent name of the main component in new process (same process line)
     * @param {Integer} newContainerID id for container where the new process happened
     * @param {Integer} newState state for new process
     * @param {String} manufacturer manufacturer of this process line
     * @param {String} updatedTime process updated date
     * @param {Integer} newWeight weight of the main component in new process
     * @param {Integer} newTemperature avg. temperature within container in new process
     * @param {String} expectedProduct name of final product of this process line
    */
    async updateProcessLine(ctx, lotNumber, newComponent, newContainerID, newState, manufacturer, updatedTime, newWeight, newTemperature, expectedProduct) {

        // Retrieve the current process line using key fields provided
        let processlineKey = ProcessLine.makeKey([lotNumber]);
        let processline = await ctx.processLineList.getProcessline(processlineKey);
        console.log(processline);

        // Validate current manufacturer
        if (processline.getManufacturer() !== manufacturer) {
            throw new Error('Process Line ' + processlineKey + ' is not owned by ' + manufacturer);
        }

        // Update state 
        switch (newState) {
            case "2":
                processline.setFeeding();
                break;
            case "3":
                processline.setReacting();
                break;
            case "4":
                processline.setTransit();
                break;
        }

        processline.setUpdateProcess(newComponent, newContainerID, updatedTime, newWeight, newTemperature);
        console.log(processline);

        // Update the process line
        await ctx.processLineList.updateProcessline(processline);
        return processline.toBuffer();
    }

    /**
     * End process line
     *
     * @param {Context} ctx the transaction context
     * @param {Integer} lotNumber lot number for final product
     * @param {String} newComponent name of the main component in new process (same process line)
     * @param {Integer} newContainerID id for container where the new process happened
     * @param {String} manufacturer manufacturer of this process line
     * @param {String} updatedTime process updated date
     * @param {Integer} newWeight weight of the main component in new process
     * @param {Integer} newTemperature avg. temperature within container in new process
     * @param {String} expectedProduct name of final product of this process line
    */
    async endProcessLine(ctx, lotNumber, newComponent, newContainerID, manufacturer, updatedTime, newWeight, newTemperature, expectedProduct) {

        let processlineKey = ProcessLine.makeKey([lotNumber]);

        let processline = await ctx.processLineList.getProcessline(processlineKey);

        // Verify that the manufacturer owns the process line && its main component is the same as expected one before end it
        if (processline.getManufacturer() === manufacturer && newComponent == expectedProduct) {
            processline.setUpdateProcess(newComponent, newContainerID, updatedTime, newWeight, newTemperature);
            processline.setEnd();
        } else {
            throw new Error('You do not own right to end process line:' + manufacturer + '- ' + expectedProduct + lotNumber);
        }

        await ctx.processLineList.updateProcessline(processline);
        return processline.toBuffer();
    }

    async queryAllProcesses(ctx, lotNumber) {
        let processlineKey = ProcessLine.makeKey([lotNumber]);
        console.log('This is processlineKey: ' + processlineKey);
        let endLotNumber = toString(parseInt(lotNumber) + 999);

        const startKey = ctx.processLineList.name + processlineKey;
        console.log(startKey);
        const endKey = ctx.processLineList.name + ProcessLine.makeKey([endLotNumber]);
        console.log(endKey);

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        return this.helper.print(iterator, allResults);
    }

    async queryProcess(ctx, lotNumber) {
        let processlineKey = ProcessLine.makeKey([lotNumber]);
        console.log('This is processlineKey: ' + processlineKey);
        const stateKey = ctx.processLineList.name + processlineKey;

        const result = await ctx.stub.getState(stateKey);

        return result;
    }

    async getHistoryByKey(ctx, lotNumber) {
        const key = ctx.processLineList.name + ProcessLine.makeKey([lotNumber]);
        const iterator = await ctx.stub.getHistoryForKey(key);

        const allResults = [];
        return this.helper.print(iterator, allResults);
    }

}

/**
 * Define product smart contract by extending Fabric Contract class
 *
 */
class ProductContract extends Contract {
    constructor() {
        // Chaincode id is processcontract, same as file name
        // Here define smart contract name as 'org.processnet.product'
        super('org.processnet.product');
        this.helper = new Helper();
    }

    /**
     * Define a custom context for process line
    */
    createContext() {
        return new ProductContext();
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

    async initProductLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const products = [
            {
                class: 'org.processnet.product',
                productID: '1',
                name: 'componentA',
                type: '2',
                currentState: '1',
                from: 'org.processnet.productlist"1"',
                processline: 'N/A',
                createdTime: '1552521600',
                weight: '450',
                supplier: 'supplierA',
                owner: 'DigiBank',
            },
            {
                class: 'org.processnet.product',
                productID: '2',
                name: 'componentB',
                type: '2',
                currentState: '1',
                from: 'org.processnet.productlist"2"',
                processline: 'N/A',
                createdTime: '1552525600',
                weight: '650',
                supplier: 'supplierB',
                owner: 'DigiBank',
            },
            {
                class: 'org.processnet.product',
                productID: '3',
                name: 'componentC',
                type: '2',
                currentState: '1',
                from: 'org.processnet.productlist"3"',
                processline: 'N/A',
                createdTime: '1552528600',
                weight: '850',
                supplier: 'supplierC',
                owner: 'DigiBank',
            },
            {
                class: 'org.processnet.product',
                productID: '4',
                name: 'drugD',
                type: '3',
                currentState: '5',
                from: 'N/A',
                processline: 'org.processnet.processlinelist"00007"',
                createdTime: '1553521600',
                weight: '350',
                supplier: 'MagnetoCorp',
                owner: 'MagnetoCorp',
            },
            {
                class: 'org.processnet.product',
                productID: '5',
                name: 'componentD',
                type: '2',
                currentState: '1',
                from: 'org.processnet.productlist"5"',
                processline: 'N/A',
                createdTime: '1553221600',
                weight: '780',
                supplier: 'supplierD',
                owner: 'DigiBank',
            },
            {
                class: 'org.processnet.product',
                productID: '6',
                name: 'drugA',
                type: '3',
                currentState: '6',
                from: 'N/A',
                processline: 'org.processnet.processlinelist"00001"',
                createdTime: '1553521600',
                weight: '350',
                supplier: 'MagnetoCorp',
                owner: 'MagnetoCorp',
            },
            {
                class: 'org.processnet.product',
                productID: '7',
                name: 'drugA',
                type: '3',
                currentState: '8',
                from: 'N/A',
                processline: 'org.processnet.processlinelist"00005"',
                createdTime: '1553521600',
                weight: '350',
                supplier: 'MagnetoCorp',
                owner: 'MagnetoCorp',
            },
        ];

        for (let i = 0; i < products.length; i++) {
            products[i].docType = 'product';
            let key = ctx.productList.name + '"' + products[i].productID + '"';
            await ctx.stub.putState(key, Buffer.from(JSON.stringify(products[i])));
            console.info('Added <--> ', products[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    /**
     * Init product
     *
     * @param {Context} ctx the transaction context
     * @param {Integer} productID product unique id
     * @param {String} name name of the product
     * @param {Integer} type type of the product
     * @param {String} from specific attribute for type of original and raw material, product key
     * @param {String} processline specific attribute for type of final product, processline key
     * @param {String} createdTime time of the product created
     * @param {Integer} weight total weight of the product
     * @param {String} supplier supplier of the product
     * @param {String} owner owner of the product
    */
    async initProduct(ctx, productID, name, type, from, processline, createdTime, weight, supplier, owner) {

        // create a new product ID
        console.log(ctx);
        console.log('----------------------')
        console.log(ctx.productList);

        // create an instance of the product
        let product = Product.createInstance(productID, name, type, from, processline, createdTime, weight, supplier, owner);

        // Smart contract, rather than product, moves product into INIT state
        product.setInit();

        // Add the product to the list of all similar products in the ledger world state
        let key = await ctx.productList.addProduct(product);
        console.log('This is the return key: ' + key);

        // Must return a serialized product to caller of smart contract
        return product.toBuffer();
    }

    /**
     * Update product status
     *
     * @param {Context} ctx the transaction context
     * @param {Integer} productID product unique id
     * @param {String} name name of the product
     * @param {Integer} newState status of the product
     * @param {String} updatedTime time of the product updated
     * @param {String} owner owner of the product
     * @param {Boolean} hasNewOwner if switch ownership to new owner
     * @param {String} newOwner new owner of the product
    */
    async updateProduct(ctx, productID, name, newState, updatedTime, owner, hasNewOwner, newOwner) {

        // Retrieve the current product using key fields provided
        let productKey = Product.makeKey([productID]);
        let product = await ctx.productList.getProduct(productKey);

        // Validate current owner
        if (product.getOwner() !== owner) {
            throw new Error('Product ' + productKey + ' is not owned by ' + owner);
        }

        // Change ownership
        if (hasNewOwner == 'true') {
            product.setNewOwner(newOwner);
        }

        // Update state 
        if (product.isInit()) {
            switch (newState) {
                case "2":
                    product.setRepackaging();
                    break;
                case "3":
                    product.setReadyToUse();
                    break;
                case "4":
                    product.setProcessing();
                    break;
                case "5":
                    product.setReadyToOrder();
                    break;
                case "6":
                    product.setUsed();
                    break;
                case "7":
                    product.setSoldOut();
                    break;
                case "8":
                    product.setPendShipping();
                    break;
                case "9":
                    product.setShipOut();
                    break;
            }

            product.setUpdateTime(updatedTime);
        }

        // Update the product
        await ctx.productList.updateProduct(product);
        return product.toBuffer();
    }

    async queryAllProducts(ctx, productID) {
        let productKey = Product.makeKey([productID]);
        console.log('This is productKey: ' + productKey);
        let endProductID = toString(parseInt(productID + 999));

        const startKey = ctx.productList.name + productKey;
        const endKey = ctx.productList.name + Product.makeKey([endProductID]);

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        return this.helper.print(iterator, allResults);
    }

    async queryProduct(ctx, productID) {
        let productKey = Product.makeKey([productID]);
        console.log('This is productKey: ' + productKey);
        const stateKey = ctx.productList.name + productKey;

        const result = await ctx.stub.getState(stateKey);

        return result;
    }

    async getHistoryByKey(ctx, productID) {
        const key = ctx.productList.name + Product.makeKey([productID]);
        const iterator = await ctx.stub.getHistoryForKey(key);

        const allResults = [];
        return this.helper.print(iterator, allResults);
    }
}

module.exports.ProcessLineContract = ProcessLineContract;
module.exports.ProductContract = ProductContract;

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