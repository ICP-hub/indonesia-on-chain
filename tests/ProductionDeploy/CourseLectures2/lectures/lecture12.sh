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
      videoTitle = \"Session 12: The Road Ahead\";
      videobucket = \"ioc-data\";
      videofile = \"Session%2012%20-%20The%20Road%20Ahead%20-%20HIRES.mp4\";
      videodescription = \"<ul><li>Preparing for the hackathon: Tips and strategies.</li><li>Building a roadmap for continued learning and development in blockchain and Web3.</li><li>Key Topics:<ul><li>Recap of key learnings from the course</li><li>Pathways for further learning and development</li><li>Introduction to hackathons, ideathons, and incubation opportunities</li></ul></li><li>Must Cover:<ul><li>Preparing for the final assessment and feedback</li><li>Opportunities for continued engagement with the ICP community</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"
