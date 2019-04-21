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
const ProcessLine = require('../contract/lib/processline.js');
const Product = require('../contract/lib/product.js');

// A wallet stores a collection of identities for use
//const wallet = new FileSystemWallet('../user/isabella/wallet');
const wallet = new FileSystemWallet('../../../../fabcar/javascript/wallet');

// Main program function
async function main() {

  // A gateway defines the peers used to access Fabric networks
  const gateway = new Gateway();

  // Main try/catch block
  try {

    // Specify userName for network access
    // const userName = 'isabella.issuer@magnetocorp.com';
    const userName = 'User1@org1.example.com';

    // Load connection profile; will be used to locate a gateway
    let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));

    // Set connection options; identity and wallet
    let connectionOptions = {
      identity: userName,
      wallet: wallet,
      discovery: { enabled:false, asLocalhost: true }
    };

    // Connect to gateway using application specified parameters
    console.log('Connect to Fabric gateway.');

    await gateway.connect(connectionProfile, connectionOptions);

    // Access ProcessNet network
    console.log('Use network channel: mychannel.');

    const network = await gateway.getNetwork('mychannel');

    // Get addressability to process line contract
    console.log('Use org.processnet.processline smart contract.');

    // Smart contract name is 'org.processnet.processline' which is set in ProcessLineContract class with super()
    const contract = await network.getContract('papercontract', 'org.processnet.processline');
    // const contract2 = await network.getContract('papercontract', 'org.processnet.product');

    // init process line
    console.log('Submit process line init transaction.');

    const issueResponse = await contract.submitTransaction('initProcessLine', '00001', 'componentA', 'CT-123', 'MagnetoCorp', '1552521600', '450', '35', 'drugA');
    // const issueResponse2 = await contract2.submitTransaction('initProduct', 'componentA', '2', '1', 'org.processnet.productlist"supplierA":"componentA":1', 'N/A', '1552521600', '450', 'supplierA', 'DigiBank');

    // process response
    console.log('Process init transaction response.');

    let processline = ProcessLine.fromBuffer(issueResponse);
    // let product = Product.fromBuffer(issueResponse2);

    console.log(`${processline.manufacturer}- ${processline.expectedProduct} process line : ${processline.lotNumber} successfully inited.`);
    // console.log(`${product.owner}- ${product.name} product : ${product.newProductID} successfully inited.`);    
    console.log('Transaction complete.');

  } catch (error) {

    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);

  } finally {

    // Disconnect from the gateway
    console.log('Disconnect from Fabric gateway.')
    gateway.disconnect();

  }
}
main().then(() => {

  console.log('Init program complete.');

}).catch((e) => {

  console.log('Init program exception.');
  console.log(e);
  console.log(e.stack);
  process.exit(-1);

});