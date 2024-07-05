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
      videoTitle = \"Session 1: Setting Up Environment\";
      videobucket = \"ioc-data\";
      videofile = \"Video%201%20-%20HIRES.mp4\";
      videodescription = \"<li>Overview of the ICP ecosystem</li><li>Tools and prerequisites for ICP development.</li><li>Step-by-step guide to setting up the development environment.
</li>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"