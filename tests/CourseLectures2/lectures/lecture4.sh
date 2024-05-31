#!/bin/bash

set -e

# course 1- lecture -4

dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 4: Understanding Web3"; videobucket = "ioc-data"; videofile = "Session 4 - Understanding Web 3 - HIRES.mp4.mp4"; videodescription="<ul><li>Key Topics:<ul><li>Definition and principles of Web3</li><li>How Web3 enhances user privacy and control</li><li>The transition from Web2 to Web3: Opportunities and challenges</li></ul></li><li>Must Cover:<ul><li>The role of tokens and smart contracts in Web3</li><li>Examples of Web3 applications changing the digital landscape</li></ul></li></ul>
"; videoduration = 600; viewcount = 100; }})';