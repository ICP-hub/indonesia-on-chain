#!/bin/bash

set -e


# course 1- lecture -12

dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 12: The Road Ahead"; videobucket = "ioc-data"; videofile = "Session 8 - Leveraging ICP for AI Applications - HIRES.mp4"; videodescription="<ul><li>Preparing for the hackathon: Tips and strategies.</li><li>Building a roadmap for continued learning and development in blockchain and Web3.</li><li>Key Topics:<ul><li>Recap of key learnings from the course</li><li>Pathways for further learning and development</li><li>Introduction to hackathons, ideathons, and incubation opportunities</li></ul></li><li>Must Cover:<ul><li>Preparing for the final assessment and feedback</li><li>Opportunities for continued engagement with the ICP community</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';