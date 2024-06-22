#!/bin/bash

set -e


# course 1- lecture -10

dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 10: Ideathon Prep and Innovation Techniques"; videobucket = "ioc-data"; videofile = "Session 8 - Leveraging ICP for AI Applications - HIRES.mp4"; videodescription="<ul><li>Key Topics:<ul><li>Techniques for effective brainstorming and ideation</li><li>Turning ideas into prototypes: Tools and methodologies</li><li>Validating your idea: Market research and user feedback</li></ul></li><li>Must Cover:<ul><li>Developing a minimum viable product (MVP) concept</li><li>Prototyping tools suitable for blockchain projects</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';