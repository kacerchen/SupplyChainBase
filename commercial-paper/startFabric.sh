#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
CC_SRC_LANGUAGE=${1:-"go"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`
if [ "$CC_SRC_LANGUAGE" = "javascript" ]; then
	CC_RUNTIME_LANGUAGE=node # chaincode runtime language is node.js
	CC_SRC_PATH=/opt/gopath/src/github.com/contract
else
	echo The chaincode language ${CC_SRC_LANGUAGE} is not supported by this script
	echo Supported chaincode languages are: go, javascript, and typescript
	exit 1
fi


# clean the keystore
rm -rf ./hfc-key-store

# launch network; create channel and join peer to channel
cd ../basic-network
./start.sh

# Now launch the cliDigiBank container in order to install, instantiate chaincode
cd ../commercial-paper/organization/digibank/configuration/cli
docker-compose -f docker-compose.yml up -d cliDigiBank
docker ps -a

docker exec cliDigiBank peer chaincode install -n processcontracts -v 0 -p /opt/gopath/src/github.com/contract -l node
docker exec cliDigiBank peer chaincode instantiate -n processcontracts -v 0 -l node -c '{"Args":["org.processnet.processline:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"
sleep 10
# docker exec cliDigiBank peerchaincode invoke -o orderer.example.com:7050 -C mychannel -n processcontracts --peerAddresses peer0.org1.example.com:7051 -c '{"Args":["initProcessLine","00001","componentA","CT-123","MagnetoCorp","1552521600","450","35","drugA"]}'

cat <<EOF

Total setup execution time : $(($(date +%s) - starttime)) secs ...

Next, use the FabCar applications to interact with the deployed FabCar contract.
The FabCar applications are available in multiple programming languages.
Follow the instructions for the programming language of your choice:

JavaScript:

  Start by changing into the "javascript" directory:
    cd javascript

  Next, install all required packages:
    npm install

  Then run the following applications to enroll the admin user, and register a new user
  called user1 which will be used by the other applications to interact with the deployed
  FabCar contract:
    node enrollAdmin
    node registerUser

  You can run the invoke application as follows. By default, the invoke application will
  create a new car, but you can update the application to submit other transactions:
    node invoke

  You can run the query application as follows. By default, the query application will
  return all cars, but you can update the application to evaluate other transactions:
    node query

EOF
