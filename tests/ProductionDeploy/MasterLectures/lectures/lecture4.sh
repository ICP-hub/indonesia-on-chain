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
            videoTitle = \"Sesi 4: Mendeploy Canister Pertama Anda\";
            videobucket = \"ioc-data\";
            videofile = \"Video%204%20-%20HIRES.mp4\";
            videodescription = \"<li>Panduan komprehensif untuk pengembangan canister.</li><li>Langkah-langkah untuk mendeploy canister pertama Anda di jaringan ICP.</li>\";
            videoduration = 600;
            viewcount = 100
        }
    }
)"

