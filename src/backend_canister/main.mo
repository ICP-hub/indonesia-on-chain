// Import necessary modules and external files for functionality
import UserController "./controllers/userController";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Map "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Error "mo:base/Error";
import Bool "mo:base/Bool";
import UserModel "./models/userModel";

import Auth "./utils/Auth";
import Types "./utils/types";
import Response "./utils/response";
import Constants "utils/constants";

// Actor declaration begins here
actor {
  // Stable storage for user data to persist across upgrades
  stable var stable_user_map : [(Principal, UserModel.User)] = [];
  // In-memory storage for user data, initialized empty
  var user_map = Map.HashMap<Principal, UserModel.User>(0, Principal.equal, Principal.hash);

  // Pre-upgrade hook to save state to stable storage
  system func preupgrade() {
    stable_user_map := Iter.toArray(user_map.entries());
  };

  // Post-upgrade hook to restore state from stable storage
  system func postupgrade() {
    let iter_val = stable_user_map.vals();
    let iter_size = stable_user_map.size();

    user_map := HashMap.fromIter<Principal, UserModel.User>(iter_val, iter_size, Principal.equal, Principal.hash);
    stable_user_map := []; // Reset array after upgrade
  };

  // Function to check if a user exists
  // 📌 Important: Verifies user existence and authentication
  public shared (msg) func get_user_info() : async Types.Result<UserModel.User, Text> {
    let owner : Principal = msg.caller;
    // let owner : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Test principal for authenticated calle
    // Authenticate the owner before proceeding
    let is_authenticated = await Auth.auth_user(owner);
    if (not is_authenticated) {
      Debug.trap(Constants.not_auth_msg); // Authentication failed
    };

    // Check for the user in the user map
    switch (user_map.get(owner)) {
      case (?user) {
        return #ok(user);
      };
      case (null) { return #err("User does not exist") }; // User not found
    };
  };

  // Function to check if a user exists
  // 📌 Important: Verifies user existence and authentication
  public shared (msg) func is_user_exist_bool() : async Result.Result<Bool, Bool> {
    let owner : Principal = msg.caller;
    // let owner : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Test principal for authenticated calle
    // Authenticate the owner before proceeding
    let is_authenticated = await Auth.auth_user(owner);
    if (not is_authenticated) {
      Debug.trap(Constants.not_auth_msg);
    };

    // Check for the user in the user map
    switch (user_map.get(owner)) {
      case (?user) {
        return #ok(true);
      };
      case (null) { return #err(false) }; // User not found
    };
  };

  // Function to register a new user
  // 📌 Important: Checks for user existence and handles registration
  public shared (msg) func register_user(inputData : Types.UserInput) : async Types.Result<UserModel.User, Text> {
    let owner : Principal = msg.caller;
    // let owner : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Test principal for authenticated caller

    let is_authenticated = await Auth.auth_user(owner);
    if (is_authenticated) {
      Debug.print("Authenticated successfully");
      // Check if the user already exists
      switch (user_map.get(owner)) {
        case (?user) {
          Debug.trap("User already exists"); // User exists, halt execution with a trap
        };
        case (null) {
          // Proceed with registration if user does not exist
          let result = await UserController.register(owner : Principal, inputData);

          switch (result) {
            case (#ok(user)) {
              user_map.put(owner, user); // Add user to in-memory storage
              return #ok(user);
            };
            case (#err(errorMessage)) {
              Debug.trap(errorMessage); // Registration failed, halt execution
            };
          };

        };
      };

    } else {
      Debug.trap(Constants.not_auth_msg); // Authentication failed, halt execution
    };
  };

  // Function to retrieve all registered users
  // ⚠️ Useful for testing and admin purposes
  public func get_all_users() : async [UserModel.User] {
    let users = Iter.toArray(user_map.vals()); // Convert users to array
    return users;
  };

  // Function to update a user profile
  // 📌 Important: Update Existing User Profile
  public shared (msg) func update_user(inputUpdateData : Types.UserUpdateInput) : async Types.Result<UserModel.User, Text> {
    let owner : Principal = msg.caller;
    // let owner : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Test principal for authenticated caller

    let is_authenticated = await Auth.auth_user(owner);
    if (is_authenticated) {
      Debug.print("Authenticated successfully");

      switch (user_map.get(owner)) {
        case (?user) {
          // Pass both existing and new data to the UserController.update function
          let result = await UserController.update(user, inputUpdateData);

          switch (result) {
            case (#ok(user)) {
              user_map.put(owner, user);
              return #ok(user);
            };
            case (#err(errorMessage)) { return #err(errorMessage) };
          };
        };
        case (null) {
          return #err("Failed to fetch existing user data");
        };
      };
    } else {
      // Handle authentication failure
      return #err(Constants.not_auth_msg);
    };
  };

  // Function to delete user (user can do itself----for testing) ----in real world scenarios admin will delete user and user can only deactivate itself
  // ⚠️ Useful for testing and admin purposes
  public shared (msg) func delete_user() : async Result.Result<Text, Text> {
    try {
      let owner : Principal = msg.caller;
      let is_authenticated = await Auth.auth_user(owner);
      if (is_authenticated) {
        let isUserDeleted = user_map.delete(owner);

        return #ok("User Deleted")

      } else {
        return #err(Constants.not_auth_msg);
      };
    } catch e {
      let message = "Error: " # Error.message(e);
      Debug.trap(message);
    };
  };

};
