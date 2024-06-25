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
      videoTitle = \"Session 3: Exploring the Internet Computer Protocol (ICP)\";
      videobucket = \"ioc-data\";
      videofile = \"Session 3 - Exploring The ICP - HIRES.mp4\";
      videodescription = \"<ul><li><strong>Key Topics:</strong><ul><li>Unique features and benefits of ICP</li><li>Comparing ICP with other blockchain technologies</li><li>ICP’s role in decentralizing the internet</li></ul></li><li><strong>Must Cover:</strong><ul><li>ICP's consensus mechanism and its advantages</li><li>Use cases specifically enabled by ICP's architecture</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"
