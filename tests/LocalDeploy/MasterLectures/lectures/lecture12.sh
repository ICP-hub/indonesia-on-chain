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
            videoTitle = \"Session 12: Navigating Stable Structures\";
            videobucket = \"ioc-data\";
            videofile = \"Video%2012%20-%20HIRES.mp4\";
            videodescription = \"<li>Understanding Stable Structures and their importance in IC development.</li><li>Techniques for utilizing Stable Structures in DApps.</li>\";
            videoduration = 600;
            viewcount = 100
        }
    }
)"
