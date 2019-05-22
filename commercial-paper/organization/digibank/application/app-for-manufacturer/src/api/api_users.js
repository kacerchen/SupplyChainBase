'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
var Fabric_Client = require('fabric-client');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);
var fabric_client = new Fabric_Client();

module.exports = {
    registerUser: async function(username, role, mspID) {

        try {

            // Create a new file system based wallet for managing identities.
            const wallet = new FileSystemWallet('../../../wallet');
    
            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(username);
            if (userExists) {
                console.log('An identity for the user ' + username + ' already exists in the wallet');
                return;
            }
    
            // Check to see if we've already enrolled the admin user.
            const adminExists = await wallet.exists('admin');
            if (!adminExists) {
                console.log('An identity for the admin user "admin" does not exist in the wallet');
                console.log('Run the enrollAdmin.js application before retrying');
                return;
            }
    
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: false } });
    
            // Get the CA client object from the gateway for interacting with the CA.
            const ca = gateway.getClient().getCertificateAuthority();
            const adminIdentity = gateway.getCurrentIdentity();
    
            // Register the user, enroll the user, and import the new identity into the wallet.
            const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: username, role: role }, adminIdentity);
            console.log('This is secret: ' + secret);
            const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });
            console.log('This is enrollment: ')
            console.log(enrollment);
            const userIdentity = X509WalletMixin.createIdentity(mspID, enrollment.certificate, enrollment.key.toBytes());
            
            console.log('This is user identity: ')
            console.log(userIdentity);
            wallet.import(username, userIdentity);
            console.log('Successfully registered and enrolled admin user ' + username + ' and imported it into the wallet');

            return userIdentity;
        } catch (error) {
            console.error(`Failed to register user ${username}: ${error}`);
            process.exit(1);
        }
        
    },

    userExist: async function(username) {
        // Create a new file system based wallet for managing identities.
        const wallet = new FileSystemWallet('../../../wallet');
            
        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(username);
        return userExists;
    },
    getUser: async function(username) {
        try {

            // Create a new file system based wallet for managing identities.
            const wallet = new FileSystemWallet('../../../wallet');
    
            // Check to see if we've already existed the user.
            const userExists = await wallet.exists(username);
            if (!userExists) {
                console.log('An identity for the user ' + username + ' does not exist in the wallet');
                return;
            }

            // const userIdentity = await wallet.export(username);
            // console.log(userIdentity);
    
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: false } });
    
            // Get the user identity object from the gateway for interacting with the CA.
            const userIdentity = gateway.getCurrentIdentity();
            console.log(userIdentity);

            return userIdentity;
        } catch (error) {
            console.error(`Failed to get user ${username}: ${error}`);
            process.exit(1);
        }
    }
}

// module.exports.registerUser('tester11', 'developer');
// module.exports.getUser('dd');