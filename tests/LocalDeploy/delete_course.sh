#!/bin/bash

set -e

dfx identity get-principal;

dfx identity use chandan;

# video#1728639483583378824
# video#1728639524573416545

# dfx canister call backend_content_canister addCourseLessons '( "1728639299530029187", variant { Video = record { videoTitle = "Blockchain Fundamentals 2"; videobucket = "ioc-data"; videofile = "Session 1 - The New Age of Entrepreneurship - Hires.mp4"; videodescription = "Overview of the ICP ecosystem. Tools and prerequisites for ICP development.
#     Step-by-step guide to setting up the development environment."; videoduration = 600; viewcount = 100; } } )';

# dfx canister call backend_content_canister getallCourse '()';

# dfx canister call backend_content_canister deleteCourse '( "1728639299530029187")';

# dfx canister call backend_content_canister removeLesson '( "1728639299530029187","video#1728639524573416545")';


