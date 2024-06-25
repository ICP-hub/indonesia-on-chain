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
      videoTitle = \"Session 1: Introduction to Entrepreneurship and Innovation\";
      videobucket = \"ioc-data\";
      videofile = \"Session 1 - The New Age of Entrepreneurship - Hires.mp4\";
      videodescription = \"<ul><li><strong>Key Topics:</strong><ul><li>Characteristics of successful entrepreneurs</li><li>Overcoming common challenges and failures</li><li>Case studies of entrepreneurial success in the tech industry</li></ul></li><li><strong>Must Cover:</strong><ul><li>Importance of resilience and adaptability</li><li>Embracing risk and learning from failure</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"