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
      videoTitle = \"Sesi 10: Persiapan Ideathon dan Teknik Inovasi\";
      videobucket = \"ioc-data\";
      videofile = \"Session%2010%20-%20Ideathon%20Prep%20and%20Innovation%20Techniques%20-%20HIRES.mp4\";
      videodescription = \"<ul><li>Topik Utama: <ul><li>Teknik-teknik untuk brainstorming dan ideasi yang efektif</li><li>Mengubah ide menjadi prototipe: Alat dan metodologi</li><li>Validasi ide Anda: Penelitian pasar dan umpan balik pengguna</li></ul></li><li>Harus Dicakup: <ul><li>Mengembangkan konsep produk minimum yang layak (MVP)</li><li>Alat prototyping yang cocok untuk proyek-proyek blockchain</li></ul></li></ul>\";
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
      testTitle = \"Ideathon Prep dan Teknik Inovasi\";
      coursename = \"ICP Academy: Perjalanan melalui Kewirausahaan dan Inovasi\"
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
    question = \"Semua idea pasti menjadi innovasi\";
    option1 = \"BENAR\";
    option2 = \"TIDAK TERDEFINISI\";
    option3 = \"SALAH\";
    option4 = \"TIDAK ADA YANG INI\";
    correctanswer = \"SALAH\"
  }
)"


dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Product aplikasi sebaiknya dimulai dari MVP yang fokus kepada main problem saja dulu \";
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
    question = \"MVP haruslah sudah sempurna\";
    option1 = \"TIDAK TERDEFINISI\";
    option2 = \"SALAH\";
    option3 = \"BENAR\";
    option4 = \"TIDAK ADA YANG INI\";
    correctanswer = \"SALAH\"
  }
)"