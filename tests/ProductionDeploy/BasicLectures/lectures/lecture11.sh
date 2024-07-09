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
      videoTitle = \"Sesi 11: Mempersembahkan Proyek Anda\";
      videobucket = \"ioc-data\";
      videofile = \"Session 11 - Pitching Your Project - HIRES-003.mp4\";
      videodescription = \"<ul><li>Langkah-langkah mengembangkan ide menjadi Minimum Viable Product (MVP).</li><li>Studi kasus: Contoh nyata MVP blockchain.</li><li>Topik Utama: <ul><li>Membuat pitch yang menarik: Struktur dan penyampaian</li></ul></li><li>Harus Dicakup: <ul><li>Mengkomunikasikan teknologi kompleks dengan sederhana</li><li>Elemen-elemen kunci dari pitch deck yang sukses</li><li>Mengelola pertanyaan dan keberatan secara efektif</li></ul></li></ul>\";
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
      testTitle = \"Mempersembahkan Proyek Anda\";
      coursename = \"ICP Academy: Sebuah Perjalanan melalui Kewirausahaan dan Inovasi\"
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
    question = \"Pitchdeck haruslah hanya 1 yang lengkap\";
    option1 = \"TRUE\";
    option2 = \"UNDEFINED\";
    option3 = \"FALSE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Kunci dari pitching ke investor adalah pitchdeck yang estetik \";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Kita memerlukan bantuan Pitch script\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"TRUE\"
  }
)"