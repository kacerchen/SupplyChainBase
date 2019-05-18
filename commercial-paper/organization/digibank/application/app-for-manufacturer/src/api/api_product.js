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
const Product = require('../../../../contract/lib/product.js');

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
        console.log('Use org.processnet.product smart contract.');

        // Smart contract name is 'org.processnet.product' which is set in ProductContract class with super()
        const contract = await network.getContract('processcontracts', 'org.processnet.product');

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
    
            // init a new product
            console.log('Submit product init transaction.');
            const issueResponse = await contract.submitTransaction('initProductLedger');
    
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
            let msg = "Init product ledger completed!";
            return msg;
    
        }
        
    },

    initProduct: async function(username, productID, name, type, from, processline, createdTime, weight, supplier, owner) {
    
        try {
            const contract = await getContract(username);
    
            // init a new product
            console.log('Submit product init transaction.');
            const issueResponse = await contract.submitTransaction('initProduct', productID, name, type, from, processline, createdTime, weight, supplier, owner);
    
            // process response
            console.log('Product init transaction response.');
            console.log(issueResponse);
            let product = Product.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return product;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },

    updateProduct: async function(username, productID, name, newState, updatedTime, owner, hasNewOwner, newOwner) {
    
        try {
            const contract = await getContract(username);
    
            // update product properties
            console.log('Submit product updated transaction.');
            const issueResponse = await contract.submitTransaction('updateProduct', productID, name, newState, updatedTime, owner, hasNewOwner, newOwner);
    
            // process response
            console.log('Process updated transaction response.');
            console.log(issueResponse);
            let product = Product.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return product;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },
    
    queryAllProducts: async function(username, owner, name, productID) {
        
        try {
            const contract = await getContract(username);
    
            // query all products
            console.log('Submit query request of all products transaction.');
            const issueResponse = await contract.submitTransaction('queryAllProducts', owner, name, productID);
    
            // process response
            console.log('Process query transaction response.');
            console.log(issueResponse);
            let products = Product.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return products;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },
    
    queryProduct: async function(username, owner, name, productID) {
        
        try {
            const contract = await getContract(username);
    
            // query single product
            console.log('Submit single product query transaction.');
            const issueResponse = await contract.submitTransaction('queryProduct', owner, name, productID);
    
            // process response
            console.log('Process query transaction response.');
            console.log(issueResponse);
            let product = Product.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return product;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },
    
    getHistoryByKey: async function(username, owner, name, productID) {
        
        try {
            const contract = await getContract(username);
    
            // query product history
            console.log('Submit product history query transaction.');
            const issueResponse = await contract.submitTransaction('getHistoryByKey', owner, name, productID);
    
            // process response
            console.log('Process query transaction response.');
            console.log(issueResponse);
            let productHistory = Product.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return productHistory;
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