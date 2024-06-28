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
            videoTitle = \"Session 8: Canister Recap and Key Takeaways\";
            videobucket = \"ioc-data\";
            videofile = \"Video%208%20-%20HIRES.mp4\";
            videodescription = \"<li>Consolidation of learned concepts about canisters.</li><li>Highlighting essential takeaways for real-world application.</li>\";
            videoduration = 600;
            viewcount = 100
        }
    }
)"

