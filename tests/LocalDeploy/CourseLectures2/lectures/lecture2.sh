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
      videoTitle = \"Session 2: Setting Up Environment (Practical)\";
      videobucket = \"ioc-data\";
      videofile = \"Session 2 - Blockchain Basics - HIRES.mp4\";
      videodescription = \"<ul><li><strong>Key Topics:</strong><ul><li>Basics of blockchain: How it works</li><li>History and evolution of blockchain</li><li>Real-world applications beyond cryptocurrencies</li></ul></li><li><strong>Must Cover:</strong><ul><li>Understanding decentralization and its impact on businesses</li><li>Overview of major blockchain platforms, with an emphasis on ICP</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"

