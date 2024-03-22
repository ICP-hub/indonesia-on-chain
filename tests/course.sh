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



dfx canister call  backend_content_canister addCourse '(record {
    courseTitle = "ICP Developer Course: Mastering Smart Contract Deployment";
    courseImg= "img";
    shortdescription="This intensive, self-paced course is tailored for individuals eager to dive deep into smart contract development on the Internet Computer (ICP). Over two weeks, participants will learn the essentials of setting up their development environment, understand the basics of ICPs Azle, and gain hands-on experience by deploying their first canister smart contract.";
    longdescription="This intensive, self-paced course is tailored for individuals eager to dive deep into smart contract development on the Internet Computer (ICP). Over two weeks, participants will learn the essentials of setting up their development environment, understand the basics of ICPs Azle, and gain hands-on experience by deploying their first canister smart contract.";
    videocount= 0;
    videoidlist= opt record  { "hhh"};
    certificateimg="hhh";
    duration= 0;
    level="Beginner";
    viewcount=0;
    viewlist= opt record { "hhh" };
    enrollmentcount=0;
    enrollmentuserId= null;
    rating=5;
    learningpoints= opt record  {"Upon course completion, students will be directed to the Dacade Platform to undertake a test covering the course content."; List_1=  "Successful completion of the test rewards students with ICP tokens."; List_2="Students must submit the GitHub link of their deployed smart contract onto the Indonesia On-Chain Platform to receive the Qualified ICP Developer NFT certificate."; List_3 ="This certificate, recognized by BNSP and shareable on LinkedIn, validates the participants expertise in ICP development." };
    questions= opt record{ "h" };
    coursetype="Self-Paced with Practical Exercises";
    professorName ="Harshit";
    professorId = "123445";})'









# for IDENTITY in "${!course_data[@]}"
# do
#   dfx identity use "$IDENTITY"
#   CURRENT_PRINCIPAL=$(dfx identity get-principal)
#   echo "Using identity $IDENTITY with principal $CURRENT_PRINCIPAL"

#   # Extract and use the user data for the current identity
#   COURSE_DATA=${course_data[$IDENTITY]}
#   echo "Registering with data: $COURSE_DATA"

#   # Call the register_user function with the current identity and its unique data
#   dfx canister call $CANISTER addCourse "($USER_DATA)"
# done


dfx canister call $CANISTER getallCourse

# dfx canister call $CANISTER getfullCourse '("1711014546691834685")'

