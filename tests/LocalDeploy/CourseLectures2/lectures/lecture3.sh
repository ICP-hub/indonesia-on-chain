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
      videoTitle = \"Session 3: Understanding Basic\";
      videobucket = \"ioc-data\";
      videofile = \"Session 3 - Introduction to ICP Azle.mp4\";
      videodescription = \"<li>Introduction to ICP Azle's core concepts.</li><li>Importance of Azle in developing DApps on ICP.</li>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"