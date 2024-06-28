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
      videoTitle = \"Session 5: The Building Blocks of Web3 on ICP\";
      videobucket = \"ioc-data\";
      videofile = \"Session%205%20-The%20Building%20Blocks%20of%20Web3%20on%20ICP.mp4\";
      videodescription = \"<ul><li>Introduction to smart contracts and canisters.</li><li>How ICP is enabling a seamless transition to Web3.</li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"