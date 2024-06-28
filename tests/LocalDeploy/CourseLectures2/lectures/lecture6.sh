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
            videoTitle = \"Session 6: Interacting With Your Canister\",
            videobucket = \"ic-data\",
            videofile = \"Video%206%20-%20HIRES.mp4\",
            videodescription = \"<li>Techniques for effective canister interaction.</li><li>Understanding canister functions and commands.</li>\",
            videoduration = 600,
            viewcount = 100
        }
    }
)"



