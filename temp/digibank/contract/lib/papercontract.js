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
        // All process lines are held in a list of products
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
        let processlineKey = ProcessLine.makeKey([manufacturer, expectedProduct, lotNumber]);
        let processline = await ctx.processLineList.getProcessline(processlineKey);

        // Validate current manufacturer
        if (processline.getManufacturer() !== manufacturer) {
            throw new Error('Process Line ' + processlineKey + ' is not owned by ' + manufacturer);
        }

        // Update state 
        if (processline.isInit()) {
            switch (newState) {
                case 2:
                    processline.setFeeding();
                    break;
                case 3:
                    processline.setReacting();
                    break;
                case 4:
                    processline.setTransit();
                    break;
            }

            processline.setUpdateProcess(newComponent, newContainerID, updatedTime, newWeight, newTemperature);
        }

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

        let processlineKey = ProcessLine.makeKey([manufacturer, expectedProduct, lotNumber]);

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

    async queryAllProcesses(ctx) {
        let processlineKey = ProcessLine.makeKey(['MagnetoCorp', 'drugA', '00001']);
        console.log('This is processlineKey: ' + processlineKey);

        const startKey = 'org.processnet.processlinelist"MagnetoCorp":"drugA":"00001"';
        const endKey = 'org.processnet.processlinelist"MagnetoCorp":"drugA":"00009"';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        this.helper.print(iterator, allResults);
    }

    async getHistoryByKey(ctx) {
        const key = 'org.processnet.processlinelist"MagnetoCorp":"drugA":"00001"';
        const iterator = await ctx.stub.getHistoryForKey(key);

        const allResults = [];
        this.helper.print(iterator, allResults);
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

    /**
     * Init product
     *
     * @param {Context} ctx the transaction context
     * @param {Integer} productID product unique id
     * @param {String} name name of the product
     * @param {Integer} type type of the product
     * @param {Integer} state status of the product
     * @param {String} from specific attribute for type of original and raw material, product key
     * @param {String} processline specific attribute for type of final product, processline key
     * @param {String} createdTime time of the product created
     * @param {Integer} weight total weight of the product
     * @param {String} supplier supplier of the product
     * @param {String} owner owner of the product
    */
    async initProduct(ctx, name, type, state, from, processline, createdTime, weight, supplier, owner) {

        // create a new product ID
        console.log(ctx);
        console.log('----------------------')
        console.log(ctx.productList);
        let newProductID = ctx.productList.id + 1;
        ctx.productList.productID = newProductID;

        // create an instance of the product
        let product = Product.createInstance(newProductID, name, type, state, from, processline, createdTime, weight, supplier, owner);

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
        let productKey = Product.makeKey([owner, name, productID]);
        let product = await ctx.productList.getProduct(productKey);

        // Validate current owner
        if (product.getOwner() !== owner) {
            throw new Error('Product ' + productKey + ' is not owned by ' + owner);
        }

        // Change ownership
        if (hasNewOwner) {
            product.setNewOwner(newOwner);
        }

        // Update state 
        if (product.isInit()) {
            switch (newState) {
                case 2:
                    product.setRepackaging();
                    break;
                case 3:
                    product.setReadyToUse();
                    break;
                case 4:
                    product.setProcessing();
                    break;
                case 5:
                    product.setReadyToOrder();
                    break;
                case 6:
                    product.setUsed();
                    break;
                case 7:
                    product.setSoldOut();
                    break;
            }

            product.setUpdateTime(updatedTime);
        }

        // Update the product
        await ctx.productList.updateProduct(product);
        return product.toBuffer();
    }

    async queryAllProducts(ctx) {
        let productKey = Product.makeKey(['MagnetoCorp', 'componentA', '00001']);
        console.log('This is productKey: ' + productKey);

        const startKey = 'org.processnet.productlist"MagnetoCorp":"componentA":"00001"';
        const endKey = 'org.processnet.productlist"MagnetoCorp":"componentA":"00009"';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        this.helper.print(iterator, allResults);
    }

    async getHistoryByKey(ctx) {
        const key = 'org.processnet.productlist"MagnetoCorp":"componentA":"00001"';
        const iterator = await ctx.stub.getHistoryForKey(key);

        const allResults = [];
        this.helper.print(iterator, allResults);
    }
}

// module.exports = ProcessLineContract;
module.exports.ProcessLineContract = ProcessLineContract;
module.exports.ProductContract = ProductContract;
