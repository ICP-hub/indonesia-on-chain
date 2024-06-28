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
            videoTitle = \"Session 4: Deploying Your First Canister\",
            videobucket = \"ic-data\",
            videofile = \"Video%204%20-%20HIRES.mp4\",
            videodescription = \"<li>Comprehensive guide to canister development.</li><li>Steps to deploy your first canister on the ICP network.</li>\",
            videoduration = 600,
            viewcount = 100
        }
    }
)"

