#!/bin/bash

# Set -e option to stop the script if any command fails
set -e

# Define a variable to hold the data
CourseID="1719388074306629856"

# Execute each script with the CourseID variable as an argument
./lectures/lecture1.sh $CourseID &&
./lectures/lecture2.sh $CourseID
# ./lectures/lecture3.sh $CourseID &&
# ./lectures/lecture4.sh $CourseID &&
# ./lectures/lecture5.sh $CourseID &&
# ./lectures/lecture6.sh $CourseID &&
# ./lectures/lecture7.sh $CourseID &&
# ./lectures/lecture8.sh $CourseID &&
# ./lectures/lecture9.sh $CourseID &&
# ./lectures/lecture10.sh $CourseID &&
# ./lectures/lecture11.sh $CourseID &&
# ./lectures/lecture12.sh $CourseID
