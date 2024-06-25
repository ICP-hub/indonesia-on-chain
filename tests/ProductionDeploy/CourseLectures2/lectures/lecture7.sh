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
      videoTitle = \"Session 7: AI Fundamentals and Blockchain\";
      videobucket = \"ioc-data\";
      videofile = \"Session 7 - AI Fundamentals and Blockchain.mp4\";
      videodescription = \"<ul><li>Key Topics:<ul><li>Basics of AI and machine learning</li><li>Integrating AI with blockchain technology</li><li>Potential of AI in enhancing blockchain security and efficiency</li></ul></li><li>Must Cover:<ul><li>AI use cases in blockchain: Fraud detection, smart contract optimization</li><li>Ethical considerations and challenges in AI-blockchain integration</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"
