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
      videoTitle = \"Session 9: Emerging Technologies and Their Impact\";
      videobucket = \"ioc-data\";
      videofile = \"SESSION 9 - EMERGING TECHNOLOGIES - Hires.mp4\";
      videodescription = \"<ul><li>Key Topics:<ul><li>Overview of emerging technologies: IoT, AR/VR, quantum computing</li><li>Synergies between these technologies and blockchain</li><li>Future trends and predictions in tech innovation</li></ul></li><li>Must Cover:<ul><li>How blockchain can secure IoT devices</li><li>Potential of combining AR/VR with blockchain for immersive experiences</li></ul></li></ul>\";
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
      testTitle = \"Emerging Technologies and Their Impact Test\";
      coursename = \"ICP Academy: A Journey through Entrepreneurship and Innovation\"
    }
  }
)")
test_id=$(echo "$output" | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')
original_test_id="test#$test_id"

echo "Extracted Test ID: $test_id"
echo "Original Test ID: $original_test_id"




dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Apa aspek kunci yang membedakan Web3 dari pendahulunya?\";
    option1 = \"Ketergantungan yang meningkat pada kontrol terpusat oleh raksasa teknologi\";
    option2 = \"Penekanan pada model ekonomi tradisional\";
    option3 = \"Pergeseran menuju desentralisasi dan pemberdayaan pengguna\";
    option4 = \"Integrasi kecerdasan buatan ke dalam aplikasi web\";
    correctanswer = \"Pergeseran menuju desentralisasi dan pemberdayaan pengguna\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Tantangan berikut ini yang tidak biasanya terkait dengan Web3?\";
    option1 = \"Skalabilitas\";
    option2 = \"Risiko keamanan\";
    option3 = \"Kompleksitas\";
    option4 = \"Akses data terbatas\";
    correctanswer = \"Akses data terbatas\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Apa fitur karakteristik dari aplikasi terdesentralisasi (DApps) di platform Internet Computer?\";
    option1 = \"Ketergantungan pada server terpusat untuk penyimpanan data\";
    option2 = \"Pemerintahan oleh otoritas pusat\";
    option3 = \"Pemanfaatan jaringan peer-to-peer dan kontrak pintar\";
    option4 = \"Penggunaan aplikasi Non-Profit\";
    correctanswer = \"Pemanfaatan jaringan peer-to-peer dan kontrak pintar\"
  }
)"