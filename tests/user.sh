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


CANISTER=$(dfx canister id backend_canister)
echo "Canister ID: $CANISTER"


IDENTITIES=( "principal2" "principal3" "principal4" "principal5")


declare -A user_data

user_data[principal2]='record {
    name = "John Doe";
    userName = "johndoe";
    role ="student";
    email= "john@example.com";
    phone= "0987654321";
    bio= opt "Experienced software engineer with a passion for coding.";
    nationalId= opt "1234567890";
    nationalIdProof= opt "national_id_proof.jpg";
    profileImage= opt "profile_picture.jpg";
    profileCoverImage= opt "cover_image.jpg";
    qualification= opt"Bachelors in Computer Science";
    experience= opt "5 years";
    status= opt"Active"
}
'

# user_data[principal3]=' {
#     name= "Alice Smith";
#     userName= "alicesmith";
#     role= "student";
#     email="alice@example.com";
#     phone= "1234567890";
#     bio= opt"Passionate about data analysis and machine learning.";
#     nationalId=opt "0987654321";
#     nationalIdProof=opt  "national_id_proof.png";
#     profileImage=opt "profile_picture.png";
#     profileCoverImage= opt "cover_image.png";
#     qualification= opt  "Self-taught";
#     experience= opt "2 years";
#     status= opt "Active"
# }'


# user_data[principal4]='record {
#   full_name = "John Doe Four";
#   profile_picture = opt vec { 80; 75; 3; 4; };
#   email = opt "two@example.com";
#   country = "Neverland";
#   telegram_id = opt "two_telegram";
#   bio = opt "A curious wanderer of digital realms.";
#   area_of_intrest = "Full Stack";
#   twitter_id = opt "two_twitter";
#   openchat_username = opt "two_openchat"
# }'

# user_data[principal5]='record {
#   full_name = "John Doe Five";
#   profile_picture = opt vec { 80; 75; 3; 4; };
#   email = opt "two@example.com";
#   country = "Neverland";
#   telegram_id = opt "two_telegram";
#   bio = opt "A curious wanderer of digital realms.";
#   area_of_intrest = "Artificial Intelligence";
#   twitter_id = opt "two_twitter";
#   openchat_username = opt "two_openchat"
# }'



for IDENTITY in "${!user_data[@]}"
do
  dfx identity use "$IDENTITY"
  CURRENT_PRINCIPAL=$(dfx identity get-principal)
  echo "Using identity $IDENTITY with principal $CURRENT_PRINCIPAL"

  # Extract and use the user data for the current identity
  USER_DATA=${user_data[$IDENTITY]}
  echo "Registering with data: $USER_DATA"

  # Call the register_user function with the current identity and its unique data
  dfx canister call $CANISTER register_user "($USER_DATA)"
done


# dfx identity use default

echo "Listing all registered users:"
dfx canister call $CANISTER get_all_users