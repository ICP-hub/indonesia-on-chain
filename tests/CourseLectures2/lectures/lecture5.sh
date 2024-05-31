#!/bin/bash

set -e


# course 1- lecture -5

dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 5: The Building Blocks of Web3 on ICP"; videobucket = "ioc-data"; videofile = "Session 5 -The Building Blocks of Web3 on ICP.mp4"; videodescription="<ul><li>Introduction to smart contracts and canisters.</li><li>How ICP is enabling a seamless transition to Web3.</li></ul>"; videoduration = 600; viewcount = 100; }})';