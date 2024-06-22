#!/usr/bin/env bash

# Number of users to create
NUM_USERS=10000000


# Function to create a user identity and update details
create_user() {
  local user_index=$1
  local email="user${user_index}@example.com"
  local name="First${user_index}"
  local userName="UserName${user_index}"
  local phone="phoneNumber${user_index}"
  local role="student"
  local bio=["bio${user_index}"]
  local nationalId=["nationalId${user_index}"]
  local experience=[""]
  local university=["University${user_index}"]
  local degree=[""]
  local cgpa=[""]
  local nationalIdProof=[""]
  local profileImage=[""]
  local qualification=[""]
  local status=["Active"]

   # Echo all user data
  echo "User $user_index data:"
  echo "  Email: $email"
  echo "  Name: $name"
  echo "  Username: $userName"
  echo "  Phone: $phone"
  echo "  Role: $role"
  echo "  Bio: $bio"
  echo "  National ID: $nationalId"
  echo "  Experience: $experience"
  echo "  University: $university"
  echo "  Degree: $degree"
  echo "  CGPA: $cgpa"
  echo "  National ID Proof: $nationalIdProof"
  echo "  Profile Image: $profileImage"
  echo "  Qualification: $qualification"
  echo "  Status: $status"

  # Create new identity
  dfx identity new user${user_index} --storage-mode=plaintext || true
    
  # Call the canister function to update user details
  dfx --identity user${user_index} canister call backend_canister register_user \
    "(
      \"$email\",
      \"$name\",
      \"$userName\",
      \"$phone\",
      \"$role\",
      \"$bio\",
      \"$nationalId\",
      \"$experience\",
      \"$university\",
      \"$degree\",
      \"$cgpa\",
      \"$nationalIdProof\",
      \"$profileImage\",
      \"$qualification\",
      \"$status\"
    )"
}

# Function to get user details
get_user_details() {
  local user_index=$1
  dfx --identity user${user_index} canister call backend_canister get_user_info
}

# Function to delete a user identity
delete_user() {
  local user_index=$1
  dfx identity remove user${user_index}
}

# Export the functions to make them available to parallel
export -f create_user
export -f get_user_details
export -f delete_user

# Measure the time taken to create users
start_time_create=$(date +%s)
seq $NUM_USERS | parallel -j10 create_user
end_time_create=$(date +%s)

# Measure the time taken to get user details
start_time_get=$(date +%s)
seq $NUM_USERS | parallel -j10 get_user_details
end_time_get=$(date +%s)

# Print the time taken for each operation
echo "Time taken to create users: $(($end_time_create - $start_time_create)) seconds"
echo "Time taken to get user details: $(($end_time_get - $start_time_get)) seconds"
