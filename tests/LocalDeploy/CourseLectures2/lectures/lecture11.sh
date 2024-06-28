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
dfx canister call backend_content_canister addCourseLessons "(
    \"$courseID\",
    variant {
        Video = record {
            videoTitle = \"Session 11: Mastering Candid Interfaces\",
            videobucket = \"ic-data\",
            videofile = \"Session 11 - Mastering Candid Interfaces.mp4\",
            videodescription = \"<li>Introduction to Candid and its role in canister development.</li><li>Practical use cases and implementation of Candid interfaces.</li>\",
            videoduration = 600,
            viewcount = 100
        }
    }
)"

