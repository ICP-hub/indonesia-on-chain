// Import necessary modules and external files for functionality
import UserController "./controllers/userController";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import TMap "mo:base/TrieMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Error "mo:base/Error";
import Bool "mo:base/Bool";
import TrieMap "mo:base/TrieMap";
import UserModel "./models/userModel";
import Cycles "mo:base/ExperimentalCycles";
import Nat "mo:base/Nat";
import List "mo:base/List";
import Auth "./utils/Auth";
import Types "./utils/types";
import Constants "utils/constants";

// Actor declaration begins here
actor {
  stable var stable_user_map : [(Principal, UserModel.User)] = [];
  var user_map = TMap.TrieMap<Principal, UserModel.User>(Principal.equal, Principal.hash);

  // Pre-upgrade hook to save state to stable storage
  system func preupgrade() {
    stable_user_map := Iter.toArray(user_map.entries());
  };

  // Post-upgrade hook to restore state from stable storage
  system func postupgrade() {
    let user_data_vals = stable_user_map.vals();

    user_map := TrieMap.fromEntries<Principal, UserModel.User>(user_data_vals, Principal.equal, Principal.hash);
    stable_user_map := [];
  };

  // Function to check if a user exists
  // 📌 Important: Verifies user existence and authentication
  public query ({ caller }) func get_user_info() : async Types.Result<UserModel.User, Text> {

    // assert not Principal.isAnonymous(caller);

    let is_authenticated = Auth.auth_user(caller);

    switch (is_authenticated) {
      case (#ok(value)) {
        // Check for the user in the user map
        switch (user_map.get(caller)) {
          case (?user) {
            return #ok(user);
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
      };
      case (#err(error)) {
        Debug.trap(Constants.not_auth_msg);
      };
    };

  };

  // Function to check if a user exists
  // 📌 Important: Verifies user existence and authentication
  public query func is_user_exist(userId : Principal) : async Result.Result<Bool, Bool> {

    let is_authenticated = Auth.auth_user(userId);

    switch (is_authenticated) {
      case (#ok(value)) {
        switch (user_map.get(userId)) {
          case (?user) {
            return #ok(value);
          };
          case (null) { return #err(false) }; // User not found
        };
      };
      case (#err(error)) {
        Debug.trap(Constants.not_auth_msg);
      };
    };
  };

  // Function to register a new user
  // 📌 Important: Checks for user existence and handles registration
  public shared ({ caller }) func register_user(inputData : Types.UserInput) : async Types.Result<UserModel.User, Text> {

    let is_authenticated = Auth.auth_user(caller);

    switch (is_authenticated) {
      case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            Debug.trap("User already exists"); // User exists, halt execution with a trap
          };
          case (null) {
            // Proceed with registration if user does not exist
            let result = await UserController.register(caller : Principal, inputData);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user); // Add user to in-memory storage
                return #ok(user);
              };
              case (#err(errorMessage)) {
                Debug.trap(errorMessage); // Registration failed, halt execution
              };
            };

          };
        };
      };
      case (#err(error)) {
        Debug.trap(Constants.not_auth_msg);
      };
    };
  };

  // Function to retrieve all registered users
  // ⚠️ Useful for testing and admin purposes
  public query func get_all_users() : async [UserModel.User] {
    let users = Iter.toArray(user_map.vals()); // Convert users to array
    return users;
  };

  // Function to update a user profile
  // 📌 Important: Update Existing User Profile
  public shared ({ caller }) func update_user(inputUpdateData : Types.UserUpdateInput) : async Types.Result<UserModel.User, Text> {

    let is_authenticated = Auth.auth_user(caller);

    switch (is_authenticated) {
      case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController.update function
            let result = await UserController.update(user, inputUpdateData);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok(user);
              };
              case (#err(errorMessage)) {
                Debug.trap(errorMessage);
              };
            };
          };
          case (null) {
            Debug.trap("Failed to fetch existing user data");
          };
        };
      };
      case (#err(error)) {
        Debug.trap(Constants.not_auth_msg);
      };
    };
  };

  // Function to delete user (user can do itself----for testing) ----in real world scenarios admin will delete user and user can only deactivate itself
  // ⚠️ Useful for testing and admin purposes
  public shared (msg) func delete_user() : async Result.Result<Text, Text> {
    try {
      let owner : Principal = msg.caller;
      let is_authenticated = Auth.auth_user(owner);

      switch (is_authenticated) {
        case (#ok(value)) {
          user_map.delete(owner);

          return #ok("User Deleted");
        };
        case (#err(error)) {
          return #err(Constants.not_auth_msg);
        };
      };
    } catch e {
      let message = "Error: " # Error.message(e);
      Debug.trap(message);
    };
  };

  // check cycles balance
  public query func check_cycle_balance() : async Nat {
    let balance = Cycles.balance();
    Debug.print("Balance: " # debug_show (balance));
    return balance;
  };

  // Function to check if user is educator or not
  // 📌 Important: Check if the user is Educator or not (return true or false)
  public query func check_is_educator(userId : Principal) : async Result.Result<Principal, Bool> {
    let is_authenticated = Auth.auth_user(userId);

    switch (is_authenticated) {
      case (#ok(_)) {
        switch (user_map.get(userId)) {
          case (?value) {
            if (Text.equal(value.role, "educator")) {
              return #ok(userId);
            } else {
              return #err(false);
            };
          };
          case (null) {
            Debug.trap("Cannot find user details");
          };
        };
      };
      case (#err(error)) {
        Debug.trap(Constants.not_auth_msg);
      };
    };
  };

  // Update ongoing course
  public shared ({ caller }) func updateOngoingCourse(courseId : Text) : async Types.Result<UserModel.User, Text> {
    let is_authenticated = Auth.auth_user(caller);

    switch (is_authenticated) {
      case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController.update function
            let result = await UserController.updateOngoingCourse(courseId, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok(user);
              };
              case (#err(errorMessage)) {
                Debug.trap(errorMessage);
              };
            };
          };
          case (null) {
            Debug.trap("Failed to fetch existing user data");
          };
        };
      };
      case (#err(error)) {
        Debug.trap(Constants.not_auth_msg);
      };
    };
  };

  // Update completed course
  public shared ({ caller }) func updateCompletedCourse(courseId : Text) : async Types.Result<UserModel.User, Text> {
    let is_authenticated = Auth.auth_user(caller);

    switch (is_authenticated) {
      case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController.update function
            let result = await UserController.updateCompletedCourse(courseId, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok(user);
              };
              case (#err(errorMessage)) {
                Debug.trap(errorMessage);
              };
            };
          };
          case (null) {
            Debug.trap("Failed to fetch existing user data");
          };
        };
      };
      case (#err(error)) {
        Debug.trap(Constants.not_auth_msg);
      };
    };
  };

  public query ({ caller }) func get_user_ongoingcourse() : async List.List<Text> {

    // assert not Principal.isAnonymous(caller);

    let is_authenticated = Auth.auth_user(caller);

    switch (is_authenticated) {
      case (#ok(value)) {
        // Check for the user in the user map
        switch (user_map.get(caller)) {
          case (?user) {
            return user.ongoingCourse;
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
      };
      case (#err(error)) {
        Debug.trap(Constants.not_auth_msg);
      };
    };

  };
};