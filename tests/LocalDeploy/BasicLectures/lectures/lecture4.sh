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
      videoTitle = \"Session 4: Understanding Web3\";
      videobucket = \"ioc-data\";
      videofile = \"Session%204%20-%20Understanding%20Web%203%20-%20HIRES.mp4.mp4\";
      videodescription = \"<ul><li>Key Topics:<ul><li>Definition and principles of Web3</li><li>How Web3 enhances user privacy and control</li><li>The transition from Web2 to Web3: Opportunities and challenges</li></ul></li><li>Must Cover:<ul><li>The role of tokens and smart contracts in Web3</li><li>Examples of Web3 applications changing the digital landscape</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"



# Add a test and extract the test ID
output=$(dfx canister call backend_content_canister addCourseLessons "(
  \"$courseID\",
  variant {
    Test = record {
      testTitle = \"Understanding Web3 Test\";
      coursename = \"ICP Academy: A Journey through Entrepreneurship and Innovation\"
    }
  }
)")
test_id=$(echo "$output" | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')
original_test_id="test#$test_id"

echo "Extracted Test ID: $test_id"
echo "Original Test ID: $original_test_id"




dfx canister call backend_content_canister addquestiontestid "(\"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Perbedaan antara Web1, Web2, dan Web3 adalah: 
- Web1: Hanya dapat dibaca. 
- Web2: Dapat membaca dan menulis. 
- Web3: Dapat membaca, menulis, dan memiliki.\";
    option1 = \"TRUE\";
    option2 = \"UNDEFINED\";
    option3 = \"FALSE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"TRUE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(\"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Web3 meningkatkan privasi dan kontrol pengguna salah satunya dengan cara menggunakan kriptografi untuk mencegah pengungkapan pola perilaku dan data profil kepada perusahaan atau pemerintah, dan juga pengguna dapat mengontrol data pribadi melalui kunci pribadi.\";
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
    question = \"Salah satu peran smart contract di dalam Web3 adalah untuk menghilangkan kebutuhan akan perantara, sedangkan peran token adalah untuk pemungutan suara pada smart contract DAO.\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"TRUE\"
  }
)"