#!/bin/bash

set -e

# course 1- lecture -1

dfx canister call backend_content_canister addCourseLessons '("1717177155845879298", variant { Video = record { videoTitle = "Introduction to Entrepreneurship and Innovation"; videobucket = "ioc-data"; videofile = "Session 1 - The New Age of Entrepreneurship - Hires.mp4"; videodescription = "<ul><li><strong>Key Topics:</strong><ul><li>Characteristics of successful entrepreneurs</li><li>Overcoming common challenges and failures</li><li>Case studies of entrepreneurial success in the tech industry</li></ul></li><li><strong>Must Cover:</strong><ul><li>Importance of resilience and adaptability</li><li>Embracing risk and learning from failure</li></ul></li></ul>"; videoduration = 600; viewcount = 100; } } )';



output=$(dfx canister call backend_content_canister addCourseLessons '( "1717177155845879298", variant { Test = record { testTitle = "AI Test 1"; coursename = "AI Basics" } } )')

# Extract the test ID using awk and remove any trailing parenthesis and quotation mark
test_id=$(echo $output | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')

# Print the extracted test ID
echo "Extracted Test ID: $test_id"

# Combine the extracted test ID with the prefix "test#"
original_test_id="test#$test_id"

# Print the original test ID
echo "Original Test ID: $original_test_id"



dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Tidak baik memiliki prioritas dalam mengerjakan pekerjaan, karena semua pekerjaan adalah sama pentingnya.\";
    option1 = \"TRUE\";
    option2 = \"UNDEFINED\";
    option3 = \"FALSE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Perseverance and Resilience: Not easily giving up; Decisiveness: Firm in making decisions; Curiosity: A strong desire to learn\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"TRUE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Untuk mengatasi tantangan dan kegagalan yang dihadapi, maka perlu membangun tim yang kuat, menghadapi persaingan, tetap konsisten dan tidak terpengaruh akan perubahan dan ketidakpastian, serta lebih memprioritaskan pekerjaan dibandingkan kehidupan pribadi.\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)"