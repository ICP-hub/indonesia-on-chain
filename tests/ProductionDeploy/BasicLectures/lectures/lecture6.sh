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
      videoTitle = \"Session 6: Menciptakan Nilai dengan Web3\";
      videobucket = \"ioc-data\";
      videofile = \"Session%206%20-Creating%20Value%20with%20Web3%20-%20HIRES-006.mp4\";
      videodescription = \"<ul><li>Topik Utama:<ul><li>Apa yang membuat DApps terdesentralisasi?</li><li>Studi kasus DApps yang sukses di ICP</li><li>Proses ideasi, desain, dan peluncuran DApp di ICP</li></ul></li><li>Harus Dibahas:<ul><li>Persyaratan teknis dan alat untuk pengembangan DApp di ICP</li><li>Pertimbangan desain pengalaman pengguna untuk DApps</li></ul></li></ul>\";
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
      testTitle = \"Menciptakan Nilai dengan Ujian Web3\";
      coursename = \"Akademi ICP: Perjalanan melalui Kewirausahaan dan Inovasi\"
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
    question = \"Bagaimana teknologi blockchain dapat meningkatkan pengalaman AR/VR?\";
    option1 = \"Dengan langsung mengontrol avatar virtual\";
    option2 = \"Dengan memastikan pemantauan kesehatan secara real-time\";
    option3 = \"Dengan menyediakan kepemilikan aset yang aman dan provenance yang terverifikasi\";
    option4 = \"Dengan memungkinkan komunikasi langsung antara perangkat\";
    correctanswer = \"Dengan memungkinkan komunikasi langsung antara perangkat\"
  }
)"


dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Apa fungsi utama teknologi blockchain dalam mengamankan perangkat IoT?\";
    option1 = \"Memastikan catatan data dan transaksi yang tidak bisa dirubah\";
    option2 = \"Meningkatkan interaktifitas dalam lingkungan virtual\";
    option3 = \"Menyediakan data sensor real-time\";
    option4 = \"Memungkinkan komunikasi langsung antara otak dan komputer\";
    correctanswer = \"Memastikan catatan data dan transaksi yang tidak bisa dirubah\"
  }
)"


dfx canister call backend_content_canister addquestiontestid --network ic "( \"$courseID\",
  \"$original_test_id\",
  record {
    question = \"Aplikasi potensial apa dari komputasi kuantum?\";
    option1 = \"Menciptakan pengalaman yang dipersonalisasi\";
    option2 = \"Meningkatkan keamanan untuk perangkat IoT\";
    option3 = \"Merevolusi penemuan obat\";
    option4 = \"Membantu komunikasi antara perangkat IoT\";
    correctanswer = \"Membantu komunikasi antara perangkat IoT\"
  }
)"