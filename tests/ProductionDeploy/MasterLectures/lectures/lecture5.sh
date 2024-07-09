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
            videoTitle = \"Sesi 5: Mendeploy Canister Pertama Anda (Praktikal)\";
            videobucket = \"ioc-data\";
            videofile = \"Video%205%20-%20HIRES.mp4\";
            videodescription = \"<li>Pendeployan langsung sebuah canister.</li><li>Memecahkan masalah umum dan memastikan pendeployan yang sukses.</li>\";
            videoduration = 600;
            viewcount = 100
        }
    }
)"
