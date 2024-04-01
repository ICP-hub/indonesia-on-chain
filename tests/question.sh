#!/bin/bash

set -e

dfx identity new principal2 --storage-mode=plaintext || true

# TESTING1=$(dfx --identity default identity get-principal)
TESTING2=$(dfx --identity principal2 identity get-principal)

# echo "TESTING1: $TESTING1"
echo "TESTING2: $TESTING2"

CANISTER=$(dfx canister id backend_content_canister)
echo "Canister ID: $CANISTER"

IDENTITIES=("principal2")

declare -A video_data

dfx canister call backend_content_canister addquestion '("1711947755744603553",record {
        question ="What is the capital of France?";
        option1 = "Rome";
        option2 = "Berlin";
        option3 = "Paris";
        option4 = "Madrid";
        correctanswer = "Paris";})'

dfx canister call backend_content_canister addquestion '("1711947755744603553",record {
        question ="Who wrote the famous play Romeo and Juliet?";
        option1 = "Jane Austen";
        option2 = "Charles Dickens";
        option3 = "Leo Tolstoy";
        option4 = "William Shakespeare";
        correctanswer = "William Shakespeare";})'


dfx canister call backend_content_canister addquestion '("1711947755744603553",record {
        question ="What is the chemical symbol for water?";
        option1 = "Wa";
        option2 = " Wt";
        option3 = "H2O";
        option4 = "Ho";
        correctanswer = "H2O";})'


dfx canister call backend_content_canister addquestion '("1711947755744603553",record {
        question =" Which planet is known as the Red Planet?";
        option1 = "Venus";
        option2 = " Mars";
        option3 = "Jupiter";
        option4 = "Saturn";
        correctanswer = "Mars";})'

dfx canister call backend_content_canister addquestion '("1711947755744603553",record {
        question ="Who painted the Mona Lisa?";
        option1 = "Michelangelo";
        option2 = "Vincent van Gogh";
        option3 = "Leonardo da Vinci";
        option4 = "Pablo Picasso";
        correctanswer = "Leonardo da Vinci";})'

dfx canister call backend_content_canister addquestion '("1711947755744603553",record {
        question ="What is the capital of France?";
        option1 = "Rome";
        option2 = "Berlin";
        option3 = "Paris";
        option4 = "Madrid";
        correctanswer = "Paris";})'

dfx canister call backend_content_canister addquestion '("1711947755744603553",record {
        question ="Who wrote the famous play Romeo and Juliet?";
        option1 = "Jane Austen";
        option2 = "Charles Dickens";
        option3 = "Leo Tolstoy";
        option4 = "William Shakespeare";
        correctanswer = "William Shakespeare";})'


dfx canister call backend_content_canister addquestion '("1711947755744603553",record {
        question ="What is the chemical symbol for water?";
        option1 = "Wa";
        option2 = " Wt";
        option3 = "H2O";
        option4 = "Ho";
        correctanswer = "H2O";})'


dfx canister call backend_content_canister addquestion '("1711947755744603553",record {
        question =" Which planet is known as the Red Planet?";
        option1 = "Venus";
        option2 = " Mars";
        option3 = "Jupiter";
        option4 = "Saturn";
        correctanswer = "Mars";})'

dfx canister call backend_content_canister addquestion '("1711947755744603553",record {
        question ="Who painted the Mona Lisa?";
        option1 = "Michelangelo";
        option2 = "Vincent van Gogh";
        option3 = "Leonardo da Vinci";
        option4 = "Pablo Picasso";
        correctanswer = "Leonardo da Vinci";})'
