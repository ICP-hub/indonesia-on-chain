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

declare -A video_data




dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record {
    videoTitle=" Introduction to the Digital Future";
    videobucket="sample";
    videofile="sample";
    videodescription="Characteristics of successful entrepreneurs
    Overcoming common challenges and failures
    Case studies of entrepreneurial success in the tech industry
    Must Cover:
    Importance of resilience and adaptability
    Embracing risk and learning from failure";
    videoduration=0;
    viewcount=0;
    viewUserId=null})'


dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record{
    videoTitle="Blockchain Basics";
    videobucket="sample";
    videofile="sample";
    videodescription="Basics of blockchain: How it works
    History and evolution of blockchain
    Real-world applications beyond cryptocurrencies
    Must Cover:
    Understanding decentralization and its impact on businesses
    Overview of major blockchain platforms, with an emphasis on ICP";
    videoduration=0;
    viewcount=0;
    viewUserId=null;
})'


dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record{
    videoTitle="Exploring the Internet Computer Protocol (ICP)";
    videobucket="sample";
    videofile="sample";
    videodescription="Unique features and benefits of ICP
    Comparing ICP with other blockchain technologies
    ICPs role in decentralizing the internet ";
    videoduration=0;
    viewcount=0;
    viewUserId=null;
})'

dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record{
    videoTitle="Navigating the Web3 Landscape and the ICP ecosystem";
    videobucket="sample";
    videofile="sample";
    videodescription="Definition and principles of Web3 How Web3 enhances user privacy and control The transition from Web2 to Web3: Opportunities and challenges Must Cover: The role of tokens and smart contracts in Web3 Examples of Web3 applications changing the digital landscape";
    videoduration=0;
    viewcount=0;
    viewUserId=null;
})'

dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record{
    videoTitle="The Building Blocks of Web3 on ICP";
    videobucket="sample";
    videofile="sample";
    videodescription="Introduction to smart contracts and canisters.How ICP is enabling a seamless transition to Web3.";
    videoduration=0;
    viewcount=0;
    viewUserId=null;
})'


dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record{
    videoTitle="Creating Value with Web3";
    videobucket="sample";
    videofile="sample";
    videodescription="What makes DApps decentralized?Case studies of successful DApps on ICPThe process of ideating, designing, and launching a DApp on ICP";
    videoduration=0;
    viewcount=0;
    viewUserId=null;
})'

dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record{
    videoTitle=" Leveraging ICP for AI Applications";
    videobucket="sample";
    videofile="sample";
    videodescription="ICPs capabilities in hosting AI applicationsCase studies: AI projects built on ICPFuture prospects of AI in the ICP ecosystem";
    videoduration=0;
    viewcount=0;
    viewUserId=null;
})'

dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record{
    videoTitle=" Emerging Technologies and Their Impact";
    videobucket="sample";
    videofile="sample";
    videodescription="Overview of emerging technologies: IoT, AR/VR, quantum computing
Synergies between these technologies and blockchain
Future trends and predictions in tech innovation";
    videoduration=0;
    viewcount=0;
    viewUserId=null;
})'

dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record{
    videoTitle="Ideathon Prep and Innovation Techniques";
    videobucket="sample";
    videofile="sample";
    videodescription="Techniques for effective brainstorming and ideation
    Turning ideas into prototypes: Tools and methodologies
    Validating your idea: Market research and user feedback";
    videoduration=0;
    viewcount=0;
    viewUserId=null;
})'

dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record{
    videoTitle=" Pitching Your Project";
    videobucket="sample";
    videofile="sample";
    videodescription="Steps to take an idea to a Minimum Viable Product (MVP).
    Case study: Real-world examples of blockchain MVPs.";
    videoduration=0;
    viewcount=0;
    viewUserId=null;
})'

dfx canister call backend_content_canister addvideodetail '("1711783220983684489",record{
    videoTitle=" The Road Ahead";
    videobucket="sample";
    videofile="sample";
    videodescription="Preparing for the hackathon: Tips and strategies.Building a roadmap for continued learning and development in blockchain and Web3.";
    videoduration=0;
    viewcount=0;
    viewUserId=null;
})'






# for IDENTITY in "${!video_data[@]}"
# do
#   dfx identity use "$IDENTITY"
#   CURRENT_PRINCIPAL=$(dfx identity get-principal)
#   echo "Using identity $IDENTITY with principal $CURRENT_PRINCIPAL"

#   # Extract and use the user data for the current identity
#   VIDEO_DATA=${video_data[$IDENTITY]}
#   echo "Registering with data: $VIDEO_DATA"
#   COURSE_ID='1711783220983684489'

#   # Call the register_user function with the current identity and its unique data
#   dfx canister call $CANISTER addvideodetail "($COURSE_ID,$VIDEO_DATA)"
# done


