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
      videoTitle = \"Sesi 5: Blok Bangunan Web3 di ICP\";
      videobucket = \"ioc-data\";
      videofile = \"Session%205%20-The%20Building%20Blocks%20of%20Web3%20on%20ICP.mp4\";
      videodescription = \"<ul><li>Pengenalan kontrak pintar dan canister.</li><li>Bagaimana ICP memungkinkan transisi mulus ke Web3.</li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"



# # Add a test and extract the test ID
# output=$(dfx canister call backend_content_canister addCourseLessons --network ic "(
#   \"$courseID\",
#   variant {
#     Test = record {
#       testTitle = \"The Building Blocks of Web3 on ICP Test\";
#       coursename = \"ICP Academy: A Journey through Entrepreneurship and Innovation\"
#     }
#   }
# )")
# test_id=$(echo "$output" | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')
# original_test_id="test#$test_id"

# echo "Extracted Test ID: $test_id"
# echo "Original Test ID: $original_test_id"




# dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
#   \"$original_test_id\",
#   record {
#     question = \"Tidak baik memiliki prioritas dalam mengerjakan pekerjaan, karena semua pekerjaan adalah sama pentingnya.\";
#     option1 = \"BENAR\";
#     option2 = \"TIDAK TERDEFINISI\";
#     option3 = \"SALAH\";
#     option4 = \"TIDAK ADA YANG INI\";
#     correctanswer = \"SALAH\"
#   }
# )"


# dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
#   \"$original_test_id\",
#   record {
#     question = \"Perseverance and Resilience: Not easily giving up; Decisiveness: Firm in making decisions; Curiosity: A strong desire to learn\";
#     option1 = \"TIDAK TERDEFINISI\";
#     option2 = \"SALAH\";
#     option3 = \"BENAR\";
#     option4 = \"TIDAK ADA YANG INI\";
#     correctanswer = \"BENAR\"
#   }
# )"


# dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
#   \"$original_test_id\",
#   record {
#     question = \"Untuk mengatasi tantangan dan kegagalan yang dihadapi, maka perlu membangun tim yang kuat, menghadapi persaingan, tetap konsisten dan tidak terpengaruh akan perubahan dan ketidakpastian, serta lebih memprioritaskan pekerjaan dibandingkan kehidupan pribadi.\";
#     option1 = \"TIDAK TERDEFINISI\";
#     option2 = \"SALAH\";
#     option3 = \"BENAR\";
#     option4 = \"TIDAK ADA YANG INI\";
#     correctanswer = \"SALAH\"
#   }
# )"