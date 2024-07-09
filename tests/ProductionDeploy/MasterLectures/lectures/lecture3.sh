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
      videoTitle = \"Sesi 3: Memahami Dasar-Dasar\";
      videobucket = \"ioc-data\";
      videofile = \"Video%203%20-%20HIRES.mp4\";
      videodescription = \"<li>Pengantar konsep inti Azle ICP.</li><li>Keberhasilan Azle dalam mengembangkan DApps di ICP.</li>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"