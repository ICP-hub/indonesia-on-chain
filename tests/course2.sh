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
    courseTitle = "cICP Academy: A Journey through Entrepreneurship and Innovation";
    courseImg= "https://placehold.co/600x400";
    shortdescription="To equip students with foundational knowledge and skills in entrepreneurship within the context of blockchain and emerging technologies.
    To provide an in-depth understanding of the Internet Computer Protocol (ICP) blockchain and its unique capabilities.
    To explore the applications of Web3 and AI in creating innovative solutions and advancing technology.
    To foster critical thinking, problem-solving, and creativity in technological advancement.";
    longdescription="To equip students with foundational knowledge and skills in entrepreneurship within the context of blockchain and emerging technologies.
    To provide an in-depth understanding of the Internet Computer Protocol (ICP) blockchain and its unique capabilities.
    To explore the applications of Web3 and AI in creating innovative solutions and advancing technology.
    To foster critical thinking, problem-solving, and creativity in technological advancement.";
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
    learningpoints= opt record  {"Introduction to Entrepreneurship and Innovation
    Understanding entrepreneurship in the digital age.
    The role of innovation in business success.
    "; List_1=  "Blockchain Fundamentals
    Basics of blockchain technology.
    Overview of different blockchain platforms with a focus on ICP.
    "  ; List_2="Students must submit the GitHub link of their deployed smart contract onto the Indonesia On-Chain Platform to receive the Qualified ICP Developer NFT certificateDeep Dive into Internet Computer Protocol (ICP)
    Architecture and unique features of ICP.
    Smart contracts and canisters on ICP.
    "; List_3 ="Leveraging AI with ICP
    Integrating AI in blockchain applications.
    Case studies of AI-driven projects on ICP." };
    questions= opt record{ "h" };
    coursetype="3 Lessons per Week";
    professorName ="Suraj Aswal";
    professorId = "coqbt-zsafa-nyyoh-izfhk-lblc4-2wizc-omd4a-jgrfc-ftmb2-afn27-dqe";
    })'

    dfx canister call $CANISTER getallCourse

