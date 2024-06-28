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
            videoTitle = \"Session 5: Deploying Your First Canister (Practical)\";
            videobucket = \"ioc-data\";
            videofile = \"Video%205%20-%20HIRES.mp4\";
            videodescription = \"<li>Hands-on deployment of a canister.</li><li>Troubleshooting common issues and ensuring successful deployment.</li>\";
            videoduration = 600;
            viewcount = 100
        }
    }
)"
