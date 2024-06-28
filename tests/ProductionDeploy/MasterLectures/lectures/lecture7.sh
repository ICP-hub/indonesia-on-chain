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
            videoTitle = \"Session 7: Building Sample Projects\";
            videobucket = \"ic-data\";
            videofile = \"Video%207%20-%20HIRES.mp4\";
            videodescription = \"<li>Exploring and deploying sample projects from the ICP library.</li><li>Insight into practical application and project deployment on ICP.</li>\";
            videoduration = 600;
            viewcount = 100
        }
    }
)"

