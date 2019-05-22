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
const ProcessLine = require('../../../../contract/lib/processline.js');

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

        // Get addressability to process line contract
        console.log('Use org.processnet.processline smart contract.');

        // Smart contract name is 'org.processnet.processline' which is set in ProcessLineContract class with super()
        const contract = await network.getContract('processcontracts', 'org.processnet.processline');

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
    
            // init process line
            console.log('Submit process line init transaction.');
            const issueResponse = await contract.submitTransaction('initProcessLineLedger');
    
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
            let msg = "Init processline ledger completed!";
            return msg;
    
        }
        
    },

    initProcessLine: async function(username, lotNumber, component, containerID, manufacturer, createdTime, weight, temperature, expectedProduct) {
    
        try {
            const contract = await getContract(username);
    
            // init process line
            console.log('Submit process line init transaction.');
            const issueResponse = await contract.submitTransaction('initProcessLine', lotNumber, component, containerID, manufacturer, createdTime, weight, temperature, expectedProduct);
    
            // process response
            console.log('Process init transaction response.');
            console.log(issueResponse);
            let processline = ProcessLine.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return processline;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },

    updateProcessLine: async function(username, lotNumber, newComponent, newContainerID, newState, manufacturer, updatedTime, newWeight, newTemperature, expectedProduct) {
    
        try {
            const contract = await getContract(username);
    
            // init process line
            console.log('Submit process line init transaction.');
            const issueResponse = await contract.submitTransaction('updateProcessLine', lotNumber, newComponent, newContainerID, newState, manufacturer, updatedTime, newWeight, newTemperature, expectedProduct);
    
            // process response
            console.log('Process init transaction response.');
            console.log(issueResponse);
            let processline = ProcessLine.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return processline;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },
    
    endProcessLine: async function(username, lotNumber, newComponent, newContainerID, manufacturer, updatedTime, newWeight, newTemperature, expectedProduct) {
        
        try {
            const contract = await getContract(username);
    
            // init process line
            console.log('Submit process line init transaction.');
            const issueResponse = await contract.submitTransaction('endProcessLine', lotNumber, newComponent, newContainerID, manufacturer, updatedTime, newWeight, newTemperature, expectedProduct);
    
            // process response
            console.log('Process init transaction response.');
            console.log(issueResponse);
            let processline = ProcessLine.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return processline;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },
    
    queryAllProcesses: async function(username, lotNumber) {
        
        try {
            const contract = await getContract(username);
    
            // init process line
            console.log('Submit process line init transaction.');
            const issueResponse = await contract.submitTransaction('queryAllProcesses', lotNumber);
    
            // process response
            console.log('Process init transaction response.');
            console.log(issueResponse);
            let processline = ProcessLine.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return processline;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },
    
    queryProcess: async function(username, lotNumber) {
        
        try {
            const contract = await getContract(username);
    
            // init process line
            console.log('Submit process line init transaction.');
            const issueResponse = await contract.submitTransaction('queryProcess', lotNumber);
    
            // process response
            console.log('Process init transaction response.');
            console.log(issueResponse);
            let processline = ProcessLine.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return processline;
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.')
            gateway.disconnect();
    
        }
    },
    
    getHistoryByKey: async function(username, lotNumber) {
        
        try {
            const contract = await getContract(username);
    
            // init process line
            console.log('Submit process line init transaction.');
            const issueResponse = await contract.submitTransaction('getHistoryByKey', lotNumber);
    
            // process response
            console.log('Process init transaction response.');
            console.log(issueResponse);
            let processline = ProcessLine.fromBuffer(issueResponse);
    
            console.log('Transaction complete.');
            return processline;
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

// init('User1@org1.example.com');

// exports.default = init;

// initProcessLine('User1@org1.example.com', '00001', 'componentA', 'CT-123', 'MagnetoCorp', '1552521600', '450', '35', 'drugA');