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
      videoTitle = \"Session 9: Emerging Technologies and Their Impact\";
      videobucket = \"ioc-data\";
      videofile = \"SESSION 9 - EMERGING TECHNNOLOGIES - Hires.mp4\";
      videodescription = \"<ul><li>Key Topics:<ul><li>Overview of emerging technologies: IoT, AR/VR, quantum computing</li><li>Synergies between these technologies and blockchain</li><li>Future trends and predictions in tech innovation</li></ul></li><li>Must Cover:<ul><li>How blockchain can secure IoT devices</li><li>Potential of combining AR/VR with blockchain for immersive experiences</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"
