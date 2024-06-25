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
      videoTitle = \"Session 6: Creating Value with Web3\";
      videobucket = \"ioc-data\";
      videofile = \"Session%206%20-Creating%20Value%20with%20Web3%20-%20HIRES-006.mp4\";
      videodescription = \"<ul><li>Key Topics:<ul><li>What makes DApps decentralized?</li><li>Case studies of successful DApps on ICP</li><li>The process of ideating, designing, and launching a DApp on ICP</li></ul></li><li>Must Cover:<ul><li>Technical requirements and tools for DApp development on ICP</li><li>User experience design considerations for DApps</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"


