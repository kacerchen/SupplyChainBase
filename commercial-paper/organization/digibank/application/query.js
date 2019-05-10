/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const wallet = new FileSystemWallet('./wallet');

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('User1@org1.example.com');
        if (!userExists) {
            console.log('An identity for the user "User1@org1.example.com" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'User1@org1.example.com', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        // const contract = network.getContract('processcontracts');
        const contract = network.getContract('processcontracts', 'org.processnet.processline');
        // const contract2 = network.getContract('processcontracts', 'org.processnet.product');
        // const contract3 = network.getContract('processcontracts', 'org.processnet.order');

        // console.log(contract3.network.contracts);

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        // const result = await contract.evaluateTransaction('queryAllCars');
        // const result = await contract.evaluateTransaction('queryAllProcesses', 'MagnetoCorp', 'drugA', '00001');
        // const result2 = await contract2.evaluateTransaction('queryAllProducts', 'DigiBank', 'componentA', '1');
        // const result3 = await contract3.evaluateTransaction('queryAllOrders', 'DigiBank', '1', '1');

        const bufferOriginal = await contract.evaluateTransaction('queryProcess', 'MagnetoCorp', 'drugA', '00001');
        let result = Buffer.from(JSON.parse(bufferOriginal).data);
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // console.log(`Transaction has been evaluated, result is: ${result2.toString()}`);
        // console.log(`Transaction has been evaluated, result is: ${result3.toString()}`);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
