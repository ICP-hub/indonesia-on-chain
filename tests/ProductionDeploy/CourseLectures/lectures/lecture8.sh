#!/bin/bash

set -e  # Exit immediately if any command fails

# Check for the presence of a course ID argument
if [ -z "$1" ]; then
    echo "Error: No course ID provided."
    echo "Usage: $0 <courseID>"
    exit 1
fi

courseID="$1"

# Adding a video lesson to the course
dfx canister call backend_content_canister addCourseLessons --network ic "(
  \"$courseID\",
  variant {
    Video = record {
      videoTitle = \"Session 8: Leveraging ICP for AI Applications\";
      videobucket = \"ioc-data\";
      videofile = \"Session 8 - Leveraging ICP for AI Applications - HIRES.mp4\";
      videodescription = \"<ul><li>Key Topics:<ul><li>ICPs capabilities in hosting AI applications</li><li>Case studies: AI projects built on ICP</li><li>Future prospects of AI in the ICP ecosystem</li></ul></li><li>Must Cover:<ul><li>Technical overview: Running AI algorithms on ICP</li><li>Hands-on activity: Conceptualizing an AI solution on ICP</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"



# Add a test and extract the test ID
output=$(dfx canister call backend_content_canister addCourseLessons --network ic "(
  \"$courseID\",
  variant {
    Test = record {
      testTitle = \"Leveraging ICP for AI Applications Test\";
      coursename = \"ICP Academy: A Journey through Entrepreneurship and Innovation\"
    }
  }
)")
test_id=$(echo "$output" | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')
original_test_id="test#$test_id"

echo "Extracted Test ID: $test_id"
echo "Original Test ID: $original_test_id"




dfx canister call backend_content_canister addquestiontestid --network ic "(
  \"$original_test_id\",
  record {
    question = \"Batasan masuk untuk membangun aplikasi AI di ICP tinggi\";
    option1 = \"TRUE\";
    option2 = \"UNDEFINED\";
    option3 = \"FALSE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid --network ic "(
  \"$original_test_id\",
  record {
    question = \"ICP memiliki biaya gas yang mahal, sehingga tidak ramah bagi pengembang baru\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid --network ic "(
  \"$original_test_id\",
  record {
    question = \"ICP adalah layer 1 blockchain terdesentralisasi yang pernah ada dalam sejarah.\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"TRUE\"
  }
)"