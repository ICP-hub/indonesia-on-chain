#!/bin/bash

set -e

dfx identity new principal2 --storage-mode=plaintext || true
dfx identity new principal3 --storage-mode=plaintext || true
dfx identity new principal4 --storage-mode=plaintext || true
dfx identity new principal5 --storage-mode=plaintext || true

# TESTING1=$(dfx --identity default identity get-principal)
TESTING2=$(dfx --identity principal2 identity get-principal)
TESTING3=$(dfx --identity principal3 identity get-principal)
TESTING4=$(dfx --identity principal4 identity get-principal)
TESTING5=$(dfx --identity principal5 identity get-principal)

# echo "TESTING1: $TESTING1"
echo "TESTING2: $TESTING2"
echo "TESTING3: $TESTING3"
echo "TESTING4: $TESTING4"
echo "TESTING5: $TESTING5"

CANISTER=$(dfx canister id backend_content_canister)
echo "Canister ID: $CANISTER"

IDENTITIES=("principal2" "principal3" "principal4" "principal5")

declare -A course_data

course_data[principal2]='record {
    courseTitle = "ICP Developer Course: Mastering Smart Contract Deployment";
    courseImg= "img";
    shortdescription="This intensive, self-paced course is tailored for individuals eager to dive deep into smart contract development on the Internet Computer (ICP). Over two weeks, participants will learn the essentials of setting up their development environment, understand the basics of ICPs Azle, and gain hands-on experience by deploying their first canister smart contract.";
    longdescription="This intensive, self-paced course is tailored for individuals eager to dive deep into smart contract development on the Internet Computer (ICP). Over two weeks, participants will learn the essentials of setting up their development environment, understand the basics of ICPs Azle, and gain hands-on experience by deploying their first canister smart contract.";
    videocount= 0;
    videoidlist=[""];
    certificateimg=Text;
    duration= 0;
    level="Beginner";
    viewcount=0;
    viewlist=[""];
    enrollmentcount=0;
    enrollmentuserId=[""];
    rating=5;
    learningpoints=[""];
    questions=[""];
    coursetype=Self-Paced with Practical Exercises;
    professorName ="Harshit";
    professorId = "123445";
}'

for IDENTITY in "${!course_data[@]}"
do
  dfx identity use "$IDENTITY"
  CURRENT_PRINCIPAL=$(dfx identity get-principal)
  echo "Using identity $IDENTITY with principal $CURRENT_PRINCIPAL"

  # Extract and use the user data for the current identity
  COURSE_DATA=${course_data[$IDENTITY]}
  echo "Registering with data: $COURSE_DATA"

  # Call the register_user function with the current identity and its unique data
  dfx canister call $CANISTER addCourse "($USER_DATA)"
done
