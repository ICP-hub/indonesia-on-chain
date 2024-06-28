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
            videoTitle = \"Session 13: Exploring Advanced Azle Capabilities\",
            videobucket = \"ic-data\",
            videofile = \"Video%2013%20-%20HIRES.mp4\",
            videodescription = \"<li>Coverage of advanced Azle features including cross-canister communication, HTTP endpoints, and more.</li><li>Understanding the comprehensive range of APIs available to Azle canisters.</li>\",
            videoduration = 600,
            viewcount = 100
        }
    }
)"
