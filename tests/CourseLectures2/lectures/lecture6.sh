#!/bin/bash

set -e


# course 1- lecture -6

dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 6: Creating Value with Web3"; videobucket = "ioc-data"; videofile = "Session 6 -Creating Value with Web3 - HIRES-006.mp4"; videodescription="<ul><li>Key Topics:<ul><li>What makes DApps decentralized?</li><li>Case studies of successful DApps on ICP</li><li>The process of ideating, designing, and launching a DApp on ICP</li></ul></li><li>Must Cover:<ul><li>Technical requirements and tools for DApp development on ICP</li><li>User experience design considerations for DApps</li></ul></li></ul>
"; videoduration = 600; viewcount = 100; }})';