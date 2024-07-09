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
      videoTitle = \"Sesi 1: Menyiapkan Lingkungan\";
      videobucket = \"ioc-data\";
      videofile = \"Video%201%20-%20HIRES.mp4\";
      videodescription = \"<li>Tinjauan tentang ekosistem ICP</li><li>Alat dan prasyarat untuk pengembangan ICP.</li><li>Panduan langkah demi langkah untuk menyiapkan lingkungan pengembangan.</li>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"