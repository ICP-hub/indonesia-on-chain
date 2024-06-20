#!/bin/bash

set -e

# course 1- lecture -1

dfx canister call backend_content_canister addCourseLessons '("1717177155845879298", variant { Video = record { videoTitle = "Introduction to Entrepreneurship and Innovation"; videobucket = "ioc-data"; videofile = "Session 1 - The New Age of Entrepreneurship - Hires.mp4"; videodescription = "<ul><li><strong>Key Topics:</strong><ul><li>Characteristics of successful entrepreneurs</li><li>Overcoming common challenges and failures</li><li>Case studies of entrepreneurial success in the tech industry</li></ul></li><li><strong>Must Cover:</strong><ul><li>Importance of resilience and adaptability</li><li>Embracing risk and learning from failure</li></ul></li></ul>"; videoduration = 600; viewcount = 100; } } )';



output=$(dfx canister call backend_content_canister addCourseLessons '( "1717177155845879298", variant { Test = record { testTitle = "AI Test 1"; coursename = "AI Basics" } } )')

# Extract the test ID using awk and remove any trailing parenthesis and quotation mark
test_id=$(echo $output | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')

# Print the extracted test ID
echo "Extracted Test ID: $test_id"

# Combine the extracted test ID with the prefix "test#"
original_test_id="test#$test_id"

# Print the original test ID
echo "Original Test ID: $original_test_id"



dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Tidak baik memiliki prioritas dalam mengerjakan pekerjaan, karena semua pekerjaan adalah sama pentingnya.\";
    option1 = \"TRUE\";
    option2 = \"UNDEFINED\";
    option3 = \"FALSE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Perseverance and Resilience: Not easily giving up; Decisiveness: Firm in making decisions; Curiosity: A strong desire to learn\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"TRUE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Untuk mengatasi tantangan dan kegagalan yang dihadapi, maka perlu membangun tim yang kuat, menghadapi persaingan, tetap konsisten dan tidak terpengaruh akan perubahan dan ketidakpastian, serta lebih memprioritaskan pekerjaan dibandingkan kehidupan pribadi.\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)"

# course 1- lecture -2

dfx canister call backend_content_canister addCourseLessons '("1717177155845879298", variant { Video = record { videoTitle ="Session 2: Blockchain Basics"; videobucket = "ioc-data"; videofile = "Session 2 - Blockchain Basics - HIRES.mp4"; videodescription = "<ul><li><strong>Key Topics:</strong><ul><li>Basics of blockchain: How it works</li><li>History and evolution of blockchain</li><li>Real-world applications beyond cryptocurrencies</li></ul></li><li><strong>Must Cover:</strong><ul><li>Understanding decentralization and its impact on businesses</li><li>Overview of major blockchain platforms, with an emphasis on ICP</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';

# # course 1- lecture -3

# dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 3: Exploring the Internet Computer Protocol (ICP)"; videobucket = "ioc-data"; videofile = "Session 3 - Exploring The ICP - HIRES.mp4"; videodescription="<ul><li><strong>Key Topics:</strong><ul><li>Unique features and benefits of ICP</li><li>Comparing ICP with other blockchain technologies</li><li>ICP’s role in decentralizing the internet</li></ul></li><li><strong>Must Cover:</strong><ul><li>ICP'\''s consensus mechanism and its advantages</li><li>Use cases specifically enabled by ICP'\''s architecture</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';

# # course 1- lecture -4

# dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 4: Understanding Web3"; videobucket = "ioc-data"; videofile = "Session 4 - Understanding Web 3 - HIRES.mp4.mp4"; videodescription="<ul><li>Key Topics:<ul><li>Definition and principles of Web3</li><li>How Web3 enhances user privacy and control</li><li>The transition from Web2 to Web3: Opportunities and challenges</li></ul></li><li>Must Cover:<ul><li>The role of tokens and smart contracts in Web3</li><li>Examples of Web3 applications changing the digital landscape</li></ul></li></ul>
# "; videoduration = 600; viewcount = 100; }})';


# # course 1- lecture -5

# dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 5: The Building Blocks of Web3 on ICP"; videobucket = "ioc-data"; videofile = "Session 5 -The Building Blocks of Web3 on ICP.mp4"; videodescription="<ul><li>Introduction to smart contracts and canisters.</li><li>How ICP is enabling a seamless transition to Web3.</li></ul>"; videoduration = 600; viewcount = 100; }})';


# # course 1- lecture -6

# dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 6: Creating Value with Web3"; videobucket = "ioc-data"; videofile = "Session 6 -Creating Value with Web3 - HIRES-006.mp4"; videodescription="<ul><li>Key Topics:<ul><li>What makes DApps decentralized?</li><li>Case studies of successful DApps on ICP</li><li>The process of ideating, designing, and launching a DApp on ICP</li></ul></li><li>Must Cover:<ul><li>Technical requirements and tools for DApp development on ICP</li><li>User experience design considerations for DApps</li></ul></li></ul>
# "; videoduration = 600; viewcount = 100; }})';



# # course 1- lecture -7

# dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 7: AI Fundamentals and Blockchain"; videobucket = "ioc-data"; videofile = "Session 7 - AI Fundamentals and Blockchain.mp4"; videodescription="<ul><li>Key Topics:<ul><li>Basics of AI and machine learning</li><li>Integrating AI with blockchain technology</li><li>Potential of AI in enhancing blockchain security and efficiency</li></ul></li><li>Must Cover:<ul><li>AI use cases in blockchain: Fraud detection, smart contract optimization</li><li>Ethical considerations and challenges in AI-blockchain integration</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';


# # course 1- lecture -8

# dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 8: Leveraging ICP for AI Applications"; videobucket = "ioc-data"; videofile = "Session 8 - Leveraging ICP for AI Applications - HIRES.mp4"; videodescription="<ul><li>Key Topics:<ul><li>ICPs capabilities in hosting AI applications</li><li>Case studies: AI projects built on ICP</li><li>Future prospects of AI in the ICP ecosystem</li></ul></li><li>Must Cover:<ul><li>Technical overview: Running AI algorithms on ICP</li><li>Hands-on activity: Conceptualizing an AI solution on ICP</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';


# # course 1- lecture -9

# dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 9: Emerging Technologies and Their Impact"; videobucket = "ioc-data"; videofile = "SESSION 9 - EMERGING TECHNNOLOGIES - Hires.mp4"; videodescription="<ul><li>Key Topics:<ul><li>Overview of emerging technologies: IoT, AR/VR, quantum computing</li><li>Synergies between these technologies and blockchain</li><li>Future trends and predictions in tech innovation</li></ul></li><li>Must Cover:<ul><li>How blockchain can secure IoT devices</li><li>Potential of combining AR/VR with blockchain for immersive experiences</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';


# # course 1- lecture -10

# dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 10: Ideathon Prep and Innovation Techniques"; videobucket = "ioc-data"; videofile = "Session 8 - Leveraging ICP for AI Applications - HIRES.mp4"; videodescription="<ul><li>Key Topics:<ul><li>Techniques for effective brainstorming and ideation</li><li>Turning ideas into prototypes: Tools and methodologies</li><li>Validating your idea: Market research and user feedback</li></ul></li><li>Must Cover:<ul><li>Developing a minimum viable product (MVP) concept</li><li>Prototyping tools suitable for blockchain projects</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';


# # course 1- lecture -11

# dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 11: Pitching Your Project"; videobucket = "ioc-data"; videofile = "Session 11 - Pitching Your Project - HIRES-003.mp4"; videodescription="<ul><li>Steps to take an idea to a Minimum Viable Product (MVP).</li><li>Case study: Real-world examples of blockchain MVPs.</li><li>Key Topics:<ul><li>Crafting a compelling pitch: Structure and delivery</li></ul></li><li>Must Cover:<ul><li>Communicating complex tech in simple terms</li><li>Key elements of a successful pitch deck</li><li>Handling questions and objections effectively</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';


# # course 1- lecture -12

# dfx canister call backend_content_canister addCourseLessons '("1717049362570867589", variant { Video = record { videoTitle = "Session 12: The Road Ahead"; videobucket = "ioc-data"; videofile = "Session 8 - Leveraging ICP for AI Applications - HIRES.mp4"; videodescription="<ul><li>Preparing for the hackathon: Tips and strategies.</li><li>Building a roadmap for continued learning and development in blockchain and Web3.</li><li>Key Topics:<ul><li>Recap of key learnings from the course</li><li>Pathways for further learning and development</li><li>Introduction to hackathons, ideathons, and incubation opportunities</li></ul></li><li>Must Cover:<ul><li>Preparing for the final assessment and feedback</li><li>Opportunities for continued engagement with the ICP community</li></ul></li></ul>"; videoduration = 600; viewcount = 100; }})';

