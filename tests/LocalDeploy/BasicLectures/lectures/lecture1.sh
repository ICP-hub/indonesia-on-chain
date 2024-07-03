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
dfx canister call backend_content_canister addCourseLessons "(
  \"$courseID\",
  variant {
    Video = record {
      videoTitle = \"Session 1: Introduction to Entrepreneurship and Innovation\";
      videobucket = \"ioc-data\";
      videofile = \"testvid/video_1_hires_out.m3u8\";
      videodescription = \"<ul><li><strong>Key Topics:</strong><ul><li>Characteristics of successful entrepreneurs</li><li>Overcoming common challenges and failures</li><li>Case studies of entrepreneurial success in the tech industry</li></ul></li><li><strong>Must Cover:</strong><ul><li>Importance of resilience and adaptability</li><li>Embracing risk and learning from failure</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"



# Adding a test and extracting the test ID
output=$(dfx canister call backend_content_canister addCourseLessons "(
  \"$courseID\",
  variant {
    Test = record {
      testTitle = \"Introduction to Entrepreneurship and Innovation Test\";
      coursename = \"ICP Academy: A Journey through Entrepreneurship and Innovation\"
    }
  }
)")
test_id=$(echo $output | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')
original_test_id="test#$test_id"

echo "Extracted Test ID: $test_id"
echo "Original Test ID: $original_test_id"

result1=$(dfx canister call backend_content_canister addquestiontestid "(\"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Tidak baik memiliki prioritas dalam mengerjakan pekerjaan, karena semua pekerjaan adalah sama pentingnya.\";
    option1 = \"TRUE\";
    option2 = \"UNDEFINED\";
    option3 = \"FALSE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)")

echo "result1 $result1";


dfx canister call backend_content_canister addquestiontestid "(\"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Karakteristik seorang entrepreneur yang sukses adalah sebagai berikut: - Ketekunan dan ketangguhan untuk tidak mudah menyerah/puas. - Ketegasan keputusan. - Rasa ingin tahu. \";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"TRUE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(\"$courseID\",
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