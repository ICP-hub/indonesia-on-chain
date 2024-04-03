#!/bin/bash

# Define variables
INDONESIA_LOGO="https://i.ibb.co/4jv3HhM/logo.png"
NFT_CANISTER_NAME="nft_canister"

# Start the local Internet Computer network replica
echo "Starting the local replica..."
dfx start --clean --background

# Pull and deploy dependencies
echo "Deploying dependencies..."
dfx deps pull
dfx deps init internet_identity --argument '(null)'
dfx deps deploy

# Deploy the nft_canister with initialization arguments
echo "Deploying the nft_canister..."
dfx deploy $NFT_CANISTER_NAME --argument="(
  principal\"$(dfx identity get-principal)\", 
  record {
    logo = record {
      logo_type = \"image/png\";
      data = \"$INDONESIA_LOGO\";
    };
    name = \"MINT CERTIFICATE\";
    symbol = \"COURSE\";
    maxLimit = 1000;
  }
)"

# Deploy other canisters
echo "Deploying other project canisters..."
dfx deploy

echo "Deployment complete!🚀🚀✅✅"


echo "Running course.sh..."
./course.sh
