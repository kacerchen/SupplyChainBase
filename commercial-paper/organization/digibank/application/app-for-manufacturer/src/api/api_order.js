/*
SPDX-License-Identifier: Apache-2.0
*/

/*
 * This application has 6 basic steps:
 * 1. Select an identity from a wallet
 * 2. Connect to network gateway
 * 3. Access ProcessNet network
 * 4. Construct request to init process line
 * 5. Submit transaction
 * 6. Process response
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Order = require('../../../../contract/lib/order.js');

// A wallet stores a collection of identities for use
//const wallet = new FileSystemWallet('../user/isabella/wallet');
const wallet = new FileSystemWallet('../../../wallet');

// A gateway defines the peers used to access Fabric networks
const gateway = new Gateway();

async function getContract(username) {
    // Specify userName for network access
    // const userName = 'User1@org1.example.com';

    try{
        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../../../../gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
        identity: username,
        wallet: wallet,
        discovery: { enabled:false, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');

        // await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: false } });
        await gateway.connect(connectionProfile, connectionOptions);

        // Access ProcessNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');

        // Get addressability to product contract
        console.log('Use org.processnet.order smart contract.');

        // Smart contract name is 'org.processnet.product' which is set in ProductContract class with super()
        const contract = await network.getContract('processcontracts', 'org.processnet.order');

        return contract;

    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    }
}

module.exports = {
    init: async function(username) {

        try {
            const contract = await getContract(username);
    
            // init a new order
            console.log('Submit order init transaction.');
            const issueResponse = await contract.submitTransaction('initOrderLedger');
    
            // process response
            console.log('Process init transaction response.');
            console.log(issueResponse);
            console.log('Transaction complete.');
            
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
            let msg = "Init order ledger completed!";
            return msg;
    
        }
        
    },

    initOrder: async function(username, orderID, type, 
        productID, name, weight, price, 
        specs, qualifiedOperator, methods, leadTime, 
        address, shipMethod, tradeTerm, dispatchDate, 
        totalAmount, initPayment, payMethod, 
        createdTime, orderer, receiver) {
    
        try {
            const contract = await getContract(username);
    
            // init a new order
            console.log('Submit order init transaction.');
            const issueResponse = await contract.submitTransaction('initOrder', orderID, type, 
            productID, name, weight, price, 
            specs, qualifiedOperator, methods, leadTime, 
            address, shipMethod, tradeTerm, dispatchDate, 
            totalAmount, initPayment, payMethod, 
            createdTime, orderer, receiver);
    
            // process response
            console.log('Order init transaction response.');
            console.log(issueResponse);
            let order = Order.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return order;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },

    modifyOrder: async function(username, orderID,
        productID, newProductID, newName, newWeight, newPrice, 
        newSpecs, newQualifiedOperator, newMethods, newLeadTime, 
        newAddress, newShipMethod, newTradeTerm, newDispatchDate, 
        newTotalAmount, newInitPayment, newPayMethod, 
        updatedTime, orderer, modifier, newState) {
    
        try {
            const contract = await getContract(username);
    
            // modify order terms
            console.log('Submit order modified transaction.');
            const issueResponse = await contract.submitTransaction('modifyOrder', orderID,
            productID, newProductID, newName, newWeight, newPrice, 
            newSpecs, newQualifiedOperator, newMethods, newLeadTime, 
            newAddress, newShipMethod, newTradeTerm, newDispatchDate, 
            newTotalAmount, newInitPayment, newPayMethod, 
            updatedTime, orderer, modifier, newState);
    
            // process response
            console.log('Process updated transaction response.');
            console.log(issueResponse);
            let order = Order.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return order;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },

    updateOrder: async function(username, orderID, productID, updatedTime, orderer, modifier, newState) {
    
        try {
            const contract = await getContract(username);
    
            // update order status
            console.log('Submit order status updated transaction.');
            const issueResponse = await contract.submitTransaction('updateOrder', orderID, productID, updatedTime, orderer, modifier, newState);
    
            // process response
            console.log('Process updated transaction response.');
            console.log(issueResponse);
            let order = Order.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return order;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },
    
    queryAllOrders: async function(username, orderID) {
        
        try {
            const contract = await getContract(username);
    
            // query all orders
            console.log('Submit query request of all orders transaction.');
            const issueResponse = await contract.submitTransaction('queryAllOrders', orderID);
    
            // process response
            console.log('Process query transaction response.');
            console.log(issueResponse);
            let orders = Order.deserializeOrderClass(Buffer.from(JSON.parse(issueResponse)), Order);
    
            console.log('Transaction complete.');
            return orders;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },
    
    queryOrder: async function(username, orderID) {
        
        try {
            const contract = await getContract(username);
    
            // query single order
            console.log('Submit single order query transaction.');
            const issueResponse = await contract.submitTransaction('queryOrder', orderID);
    
            // process response
            console.log('Process query transaction response.');
            console.log(issueResponse);
            let order = Order.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return order;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },
    
    getHistoryByKey: async function(username, orderID) {
        
        try {
            const contract = await getContract(username);
    
            // query order history
            console.log('Submit order history query transaction.');
            const issueResponse = await contract.submitTransaction('getHistoryByKey', orderID);
    
            // process response
            console.log('Process query transaction response.');
            console.log(issueResponse);
            let orderHistory = Order.deserializeOrderClass(Buffer.from(JSON.parse(issueResponse)), Order);
    
            console.log('Transaction complete.');
            return orderHistory;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    }
}