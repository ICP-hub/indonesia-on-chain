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
      videofile = \"Session 2 - Practical Application.mp4\";
      videodescription = \"<li>Practical application of Episode 1's theory.</li><li>First-hand experience in configuring the necessary development tools and environment.</li>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"

