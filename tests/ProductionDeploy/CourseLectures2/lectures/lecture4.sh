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
      videoTitle = \"Session 4: Understanding Web3\";
      videobucket = \"ioc-data\";
      videofile = \"Session%204%20-%20Understanding%20Web%203%20-%20HIRES.mp4.mp4\";
      videodescription = \"<ul><li>Key Topics:<ul><li>Definition and principles of Web3</li><li>How Web3 enhances user privacy and control</li><li>The transition from Web2 to Web3: Opportunities and challenges</li></ul></li><li>Must Cover:<ul><li>The role of tokens and smart contracts in Web3</li><li>Examples of Web3 applications changing the digital landscape</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"
