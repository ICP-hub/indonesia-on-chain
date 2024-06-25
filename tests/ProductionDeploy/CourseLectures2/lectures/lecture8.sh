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
      videoTitle = \"Session 8: Leveraging ICP for AI Applications\";
      videobucket = \"ioc-data\";
      videofile = \"Session 8 - Leveraging ICP for AI Applications - HIRES.mp4\";
      videodescription = \"<ul><li>Key Topics:<ul><li>ICPs capabilities in hosting AI applications</li><li>Case studies: AI projects built on ICP</li><li>Future prospects of AI in the ICP ecosystem</li></ul></li><li>Must Cover:<ul><li>Technical overview: Running AI algorithms on ICP</li><li>Hands-on activity: Conceptualizing an AI solution on ICP</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"
