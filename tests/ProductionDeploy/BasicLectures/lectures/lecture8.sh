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
      videoTitle = \"Sesi 8: Memanfaatkan ICP untuk Aplikasi AI\";
      videobucket = \"ioc-data\";
      videofile = \"Session 8 - Leveraging ICP for AI Applications - HIRES.mp4\";
      videodescription = \"<ul><li>Topik Utama: <ul><li>Kemampuan ICP dalam menjalankan aplikasi AI</li><li>Studi kasus: Proyek AI yang dibangun di atas ICP</li><li>Perspektif masa depan AI dalam ekosistem ICP</li></ul></li><li>Harus Dicakup: <ul><li>Tinjauan teknis: Menjalankan algoritma AI di ICP</li><li>Aktivitas praktis: Memanfaatkan solusi AI di ICP</li></ul></li></ul>\";
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
      testTitle = \"Ujian Pemanfaatan ICP untuk Aplikasi Kecerdasan Buatan\";
      coursename = \"ICP Academy: Perjalanan Melalui Kewirausahaan dan Inovasi\"
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
    question = \"Batasan masuk untuk membangun aplikasi AI di ICP tinggi\";
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
    question = \"ICP memiliki biaya gas yang mahal, sehingga tidak ramah bagi pengembang baru\";
    option1 = \"TIDAK TERDEFINISI\";
    option2 = \"SALAH\";
    option3 = \"BENAR\";
    option4 = \"TIDAK ADA YANG INI\";
    correctanswer = \"SALAH\"
  }
)"


dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
  \"$original_test_id\",
  record {
    question = \"ICP adalah layer 1 blockchain terdesentralisasi yang pernah ada dalam sejarah.\";
    option1 = \"TIDAK TERDEFINISI\";
    option2 = \"SALAH\";
    option3 = \"BENAR\";
    option4 = \"TIDAK ADA YANG INI\";
    correctanswer = \"BENAR\"
  }
)"