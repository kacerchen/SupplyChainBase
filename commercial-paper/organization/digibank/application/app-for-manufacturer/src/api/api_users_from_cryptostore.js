'use strict';

var Fabric_Client = require('fabric-client');
var Fabric_CA_Client = require('fabric-ca-client');
var path          = require('path');
var util          = require('util');
var os            = require('os');

module.exports = {
    registerUser: async function(username, role, mspID, org) {

        var fabric_client = new Fabric_Client();
		var fabric_ca_client = null;
		var admin_user = null;
        var member_user = null;
        var org = org;
		var store_path = path.join(os.homedir(), '.hfc-key-store');
        console.log(' Store path:'+store_path);
        
        // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
		Fabric_Client.newDefaultKeyValueStore({ path: store_path
		}).then((state_store) => {
			// assign the store to the fabric client
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();
			// use the same location for the state store (where the users' certificate are kept)
			// and the crypto store (where the users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			var	tlsOptions = {
				trustedRoots: [],
				verify: false
			};
			// be sure to change the http to https when the CA is running TLS enabled
			fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', null , '', crypto_suite);

			// first check to see if the admin is already enrolled
			return fabric_client.getUserContext('admin', true);
		}).then((user_from_store) => {
			if (user_from_store && user_from_store.isEnrolled()) {
				console.log('Successfully loaded admin from persistence');
				admin_user = user_from_store;
				// console.log(admin_user);
			} else {
				throw new Error('Failed to get admin.... run registerAdmin.js');
			}

			// at this point we should have the admin user
			// first need to register the user with the CA server
			return fabric_ca_client.register({enrollmentID: username, affiliation: org + '.department1'}, admin_user);
		}).then((secret) => {
			// next we need to enroll the user with CA server
			console.log('Successfully registered ' + username + '- secret:' + secret);

			//Enroll a registered user in order to receive a signed X509 certificate, return EnrollmentResponse object
			return fabric_ca_client.enroll({enrollmentID: username, enrollmentSecret: secret});
		}).then((enrollment) => {
		console.log('Successfully enrolled member user ' + username);
		return fabric_client.createUser(
			{username: username,
			mspid: mspID,
			cryptoContent: { privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate }
			});
		}).then((user) => {
			member_user = user;
			// user._enrollmentSecret = password;
			user._roles = role;

			return fabric_client.setUserContext(member_user);
		}).then((user)=>{
			console.log(username + ' was successfully registered and enrolled and is ready to intreact with the fabric network');
            console.log(user);

            let result = {
                username: user._name,
                role: user._roles,
                mspid: user._mspId
            }
            console.log(result);

            return result;
		}).catch((err) => {
			console.error('Failed to register: ' + err);
			if(err.toString().indexOf('Authorization') > -1) {
				console.error('Authorization failures may be caused by having admin credentials from a previous CA instance.\n' +
				'Try again after deleting the contents of the store directory '+store_path);
			}
		});
    },

    userExist: async function(username) {
        var fabric_client = new Fabric_Client();
        var fabric_ca_client = null;
		var store_path = path.join(os.homedir(), '.hfc-key-store');
		console.log(' Store path:'+store_path);

		// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
		Fabric_Client.newDefaultKeyValueStore({ path: store_path
		}).then((state_store) => {
			// assign the store to the fabric client
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();
			// use the same location for the state store (where the users' certificate are kept)
			// and the crypto store (where the users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			var	tlsOptions = {
				trustedRoots: [],
				verify: false
			};
			// be sure to change the http to https when the CA is running TLS enabled
			fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', null , '', crypto_suite);

			// first check to see if the admin is already enrolled
			return fabric_client.getUserContext(username, true);
		}).then((user) => {
            return user && user.isEnrolled();
        }).catch((err) => {
            console.error('Failed to get user: ' + err);
            if(err.toString().indexOf('Authorization') > -1) {
                console.error('Authorization failures may be caused by having admin credentials from a previous CA instance.\n' +
                'Try again after deleting the contents of the store directory '+store_path);
            }
        });
    },

    getUser: async function(username) {
        var fabric_client = new Fabric_Client();
        var fabric_ca_client = null;
		var store_path = path.join(os.homedir(), '.hfc-key-store');
		console.log(' Store path:'+store_path);

		// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
		Fabric_Client.newDefaultKeyValueStore({ path: store_path
		}).then((state_store) => {
			// assign the store to the fabric client
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();
			// use the same location for the state store (where the users' certificate are kept)
			// and the crypto store (where the users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			var	tlsOptions = {
				trustedRoots: [],
				verify: false
			};
			// be sure to change the http to https when the CA is running TLS enabled
			fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', null , '', crypto_suite);

			// first check to see if the admin is already enrolled
			return fabric_client.getUserContext(username, true);
		}).then((user) => {
            console.log(user);
            if(user && user.isEnrolled()) {
                console.log('Get ' + user + ' from persistence.');
                return user
            } 
        }).catch((err) => {
            console.error('Failed to get user: ' + err);
            if(err.toString().indexOf('Authorization') > -1) {
                console.error('Authorization failures may be caused by having admin credentials from a previous CA instance.\n' +
                'Try again after deleting the contents of the store directory '+store_path);
            }
        });
    },

    getUserRole: async function(username) {
        var fabric_client = new Fabric_Client();
        var fabric_ca_client = null;
		var store_path = path.join(os.homedir(), '.hfc-key-store');
		console.log(' Store path:'+store_path);

		// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
		Fabric_Client.newDefaultKeyValueStore({ path: store_path
		}).then((state_store) => {
			// assign the store to the fabric client
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();
			// use the same location for the state store (where the users' certificate are kept)
			// and the crypto store (where the users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			var	tlsOptions = {
				trustedRoots: [],
				verify: false
			};
			// be sure to change the http to https when the CA is running TLS enabled
			fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', null , '', crypto_suite);

			// first check to see if the admin is already enrolled
			return fabric_client.getUserContext(username, true);
		}).then((user) => {
            if(user && user.isEnrolled()) {
                console.log('Get ' + user + ' from persistence.');
                let userResult = {
                    role: user._roles,
                    mspid: user._identity._mspId
                }
                
                console.log(userResult);
                return userResult;
            } 
        }).catch((err) => {
            console.error('Failed to get user: ' + err);
            if(err.toString().indexOf('Authorization') > -1) {
                console.error('Authorization failures may be caused by having admin credentials from a previous CA instance.\n' +
                'Try again after deleting the contents of the store directory '+store_path);
            }
        });
    }
}

// module.exports.registerUser('tester14', 'developer', 'Org1MSP', 'org1');
// module.exports.getUserRole('tester14');