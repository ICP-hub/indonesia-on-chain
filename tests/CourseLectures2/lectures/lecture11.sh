#!/bin/bash

set -e


# course 1- lecture -11

dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 11: Pitching Your Project"; videobucket = "ioc-data"; videofile = "Session 11 - Pitching Your Project - HIRES-003.mp4"; videodescription="<ul><li>Steps to take an idea to a Minimum Viable Product (MVP).</li><li>Case study: Real-world examples of blockchain MVPs.</li><li>Key Topics:<ul><li>Crafting a compelling pitch: Structure and delivery</li></ul></li><li>Must Cover:<ul><li>Communicating complex tech in simple terms</li><li>Key elements of a successful pitch deck</li><li>Handling questions and objections effectively</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';