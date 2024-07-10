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
      videoTitle = \"Sesi 4: Memahami Web3\";
      videobucket = \"ioc-data\";
      videofile = \"Session%204%20-%20Understanding%20Web%203%20-%20HIRES.mp4.mp4\";
      videodescription = \"<ul><li>Topik Utama: <ul><li>Definisi dan prinsip Web3</li><li>Bagaimana Web3 meningkatkan privasi dan kontrol pengguna</li><li>Transisi dari Web2 ke Web3: Peluang dan tantangan</li></ul></li><li>Harus Dicakup: <ul><li>Peran token dan smart contract dalam Web3</li><li>Contoh aplikasi Web3 yang mengubah lanskap digital</li></ul></li></ul>\";
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
      testTitle = \"Memahami Tes Web3\";
      coursename = \"Akademi ICP: Perjalanan Melalui Kewirausahaan dan Inovasi\"
    }
  }
)")
test_id=$(echo "$output" | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')
original_test_id="test#$test_id"

echo "Extracted Test ID: $test_id"
echo "Original Test ID: $original_test_id"




dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Perbedaan antara Web1, Web2, dan Web3 adalah: 
- Web1: Hanya dapat dibaca. 
- Web2: Dapat membaca dan menulis. 
- Web3: Dapat membaca, menulis, dan memiliki.\";
    option1 = \"BENAR\";
    option2 = \"TIDAK TERDEFINISI\";
    option3 = \"SALAH\";
    option4 = \"TIDAK ADA YANG INI\";
    correctanswer = \"BENAR\"
  }
)"


dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Web3 meningkatkan privasi dan kontrol pengguna salah satunya dengan cara menggunakan kriptografi untuk mencegah pengungkapan pola perilaku dan data profil kepada perusahaan atau pemerintah, dan juga pengguna dapat mengontrol data pribadi melalui kunci pribadi.\";
    option1 = \"TIDAK TERDEFINISI\";
    option2 = \"SALAH\";
    option3 = \"BENAR\";
    option4 = \"TIDAK ADA YANG INI\";
    correctanswer = \"BENAR\"
  }
)"


dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Salah satu peran smart contract di dalam Web3 adalah untuk menghilangkan kebutuhan akan perantara, sedangkan peran token adalah untuk pemungutan suara pada smart contract DAO.\";
    option1 = \"TIDAK TERDEFINISI\";
    option2 = \"SALAH\";
    option3 = \"BENAR\";
    option4 = \"TIDAK ADA YANG INI\";
    correctanswer = \"BENAR\"
  }
)"