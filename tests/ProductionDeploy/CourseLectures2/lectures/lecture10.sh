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
      videoTitle = \"Session 10: Ideathon Prep and Innovation Techniques\";
      videobucket = \"ioc-data\";
      videofile = \"Session%2010%20-%20Ideathon%20Prep%20and%20Innovation%20Techniques%20-%20HIRES.mp4\";
      videodescription = \"<ul><li>Key Topics:<ul><li>Techniques for effective brainstorming and ideation</li><li>Turning ideas into prototypes: Tools and methodologies</li><li>Validating your idea: Market research and user feedback</li></ul></li><li>Must Cover:<ul><li>Developing a minimum viable product (MVP) concept</li><li>Prototyping tools suitable for blockchain projects</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"
