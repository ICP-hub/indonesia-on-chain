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
      videoTitle = \"Sesi 1: Pengenalan Kewirausahaan dan Inovasi\";
      videobucket = \"ioc-data\";
      videofile = \"Session 1 - The New Age of Entrepreneurship - Hires.mp4\";
      videodescription = \"<ul><li><strong>Topik Utama:</strong> <ul><li>Karakteristik pengusaha sukses</li><li>Mengatasi tantangan dan kegagalan umum</li><li>Studi kasus keberhasilan kewirausahaan di industri teknologi</li></ul></li><li><strong>Harus Dicakup:</strong> <ul><li>Keutamaan ketahanan dan kemampuan beradaptasi</li><li>Menerima risiko dan belajar dari kegagalan</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"



# Adding a test and extracting the test ID
output=$(dfx canister call backend_content_canister addCourseLessons --network ic "(
  \"$courseID\",
  variant {
    Test = record {
      testTitle = \"Pengantar Tes Kewirausahaan dan Inovasi\";
      coursename = \"Akademi ICP: Sebuah Perjalanan melalui Kewirausahaan dan Inovasi\"
    }
  }
)")
test_id=$(echo $output | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')
original_test_id="test#$test_id"



dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Tidak baik memiliki prioritas dalam mengerjakan pekerjaan, karena semua pekerjaan adalah sama pentingnya.\";
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
    question = \"Karakteristik seorang entrepreneur yang sukses adalah sebagai berikut: - Ketekunan dan ketangguhan untuk tidak mudah menyerah/puas. - Ketegasan keputusan. - Rasa ingin tahu.\";
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
    question = \"Untuk mengatasi tantangan dan kegagalan yang dihadapi, maka perlu membangun tim yang kuat, menghadapi persaingan, tetap konsisten dan tidak terpengaruh akan perubahan dan ketidakpastian, serta lebih memprioritaskan pekerjaan dibandingkan kehidupan pribadi.\";
    option1 = \"TIDAK TERDEFINISI\";
    option2 = \"SALAH\";
    option3 = \"BENAR\";
    option4 = \"TIDAK ADA YANG INI\";
    correctanswer = \"SALAH\"
  }
)"