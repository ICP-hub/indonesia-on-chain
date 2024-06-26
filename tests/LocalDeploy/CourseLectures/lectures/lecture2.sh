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
      videoTitle = \"Session 2: Blockchain Basics\";
      videobucket = \"ioc-data\";
      videofile = \"Session 2 - Blockchain Basics - HIRES.mp4\";
      videodescription = \"<ul><li><strong>Key Topics:</strong><ul><li>Basics of blockchain: How it works</li><li>History and evolution of blockchain</li><li>Real-world applications beyond cryptocurrencies</li></ul></li><li><strong>Must Cover:</strong><ul><li>Understanding decentralization and its impact on businesses</li><li>Overview of major blockchain platforms, with an emphasis on ICP</li></ul></li></ul>\";
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
      testTitle = \"Blockchain Basics Test\";
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
    question = \"Apa yang dimaksud dengan blockchain?\";
    option1 = \"Data yang tersimpan dalam G-Drive\";
    option2 = \"Data yang tersimpan dalam cloud\";
    option3 = \"Basis data yang didistribusikan & tersebar di beberapa node (server) dalam jaringan peer-to-peer\";
    option4 = \"Basis data yang terpusat pada satu server khusus\";
    correctanswer = \"Basis data yang didistribusikan & tersebar di beberapa node (server) dalam jaringan peer-to-peer\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(\"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Berikut ini adalah karakteristik blockchain, kecuali?\";
    option1 = \"Lebih mudah ditelusuri\";
    option2 = \"Lebih aman\";
    option3 = \"Transparan\";
    option4 = \"Perlu sandi khusus\";
    correctanswer = \"Perlu sandi khusus\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(\"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Blockchain adalah teknologi yang mendasari?\";
    option1 = \"Internet\";
    option2 = \"Media Sosial\";
    option3 = \"Kripto\";
    option4 = \"Email\";
    correctanswer = \"Internet\"
  }
)"



dfx canister call backend_content_canister addquestiontestid "(\"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Apa nama lain dari Blockchain?\";
    option1 = \"Sistem penyimpanan data terpusat\";
    option2 = \"Buku besar digital yang aman, transparan, dan terdistribusi\";
    option3 = \"Perangkat lunak untuk komunikasi online\";
    option4 = \"Mesin pencari di Internet\";
    correctanswer = \"Buku besar digital yang aman, transparan, dan terdistribusi\"
  }
)"



dfx canister call backend_content_canister addquestiontestid "(\"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Apa isi di setiap block dari Blockchain?\";
    option1 = \"Hanya pesan teks\";
    option2 = \"Data transaksi dan informasi lain\";
    option3 = \"Foto dan Video\";
    option4 = \"Iklan dan Promosi\";
    correctanswer = \"Data transaksi dan informasi lain\"
  }
)"