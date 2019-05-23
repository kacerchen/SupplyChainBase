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
const Order = require('../contract/lib/order.js');

// A wallet stores a collection of identities for use
//const wallet = new FileSystemWallet('../user/isabella/wallet');
const wallet = new FileSystemWallet('./wallet');

//Count record
let productID = 0;
let orderID = 0;

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
    // const contract = await network.getContract('processcontracts', 'org.processnet.processline');
    // const contract2 = await network.getContract('processcontracts', 'org.processnet.product');
    const contract3 = await network.getContract('processcontracts', 'org.processnet.order');
    // const contract4 = await network.getContract('processcontracts', 'FabCar');

    // init process line
    console.log('Submit process line init transaction.');

    productID += 1;

    // const issueResponse = await contract.submitTransaction('initProcessLine', '00007', 'componentA', 'CT-123', 'MagnetoCorp', '1552521600', '450', '35', 'drugA');
    // const issueResponse = await contract.submitTransaction('updateProcessLine', '00001', 'componentB', 'CT-456', '2', 'MagnetoCorp', '1552521600', '450', '35', 'drugA');
    // const issueResponse = await contract.submitTransaction('queryAllProcesses', 'MagnetoCorp', 'drugA', '00001');

    // const issueResponse2 = await contract2.submitTransaction('initProduct', productID.toString(), 'componentA', '2', '1', 'org.processnet.productlist"supplierA":"componentA":1', 'N/A', '1552521600', '450', 'supplierA', 'DigiBank');
    // const issueResponse3 = await contract3.submitTransaction('initOrder', '1', '1', '1', 'finalA', '450', '1350', 
    //                                                          'some specs...', 'need operator get C license', 'follow our SOP', '1 months', 
    //                                                          'Beacon st., Boston, MA', 'air express', 'FCA', 'ship in 2 days.',
    //                                                          '1350', '500', 'visa', 
    //                                                          '1552521600', 'DigiBank', 'supplierA');
    // const issueResponse3 = await contract3.submitTransaction('initOrderLedger');
    const issueResponse3 = await contract3.submitTransaction('modifyOrder', '1', '1', '2', 'drugA-2', '455', '1356', 
                                                             'N/A', 'N/A', 'N/A', 'N/A',
                                                             'Apt 810, Beacon st., Boston, MA', 'sea express', 'FAS', 'ship in 5 days',
                                                             '1356', '500', 'mastercard', 
                                                             '1552821600', 'CVS', 'MagnetoCorp', '5');
    // const issueResponse3 = await contract3.submitTransaction('queryAllOrders', 'DigiBank', '1', '1');

    // const issueResponse = await contract.submitTransaction('initProcessLineLedger');
    // const issueResponse = await contract4.submitTransaction('initLedger');

    // process response
    console.log('Process init transaction response.');
    console.log(issueResponse3);

    // let processline = ProcessLine.fromBuffer(issueResponse);
    // let product = Product.fromBuffer(issueResponse2);
    // let order = Order.deserializeOrderClass(Buffer.from(JSON.parse(issueResponse3)), Order);

    // console.log(`${processline.manufacturer}- ${processline.expectedProduct} process line : ${processline.lotNumber} successfully inited.`);
    // console.log(`${product.owner}- ${product.name} product : ${product.newProductID} successfully inited.`);    
    // console.log(`${order.orderer}- ${order.productObj.productID} order : ${order.newOrderID} successfully inited.`);    
    // console.log(processline);
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

module.exports.main = main;