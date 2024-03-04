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

  // Function to register a new user
  // 📌 Important: Checks for user existence and handles registration
  public shared (msg) func register_user(inputData : UserModel.User) : async Types.Result<UserModel.User, Text> {
    let owner : Principal = msg.caller;
    // let owner : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Test principal for authenticated caller

    let is_authenticated = await Auth.auth_user(owner);
    if (is_authenticated) {
      Debug.print("Authenticated successfully");
      // Check if the user already exists
      let check_exist_user = await is_user_exist(?owner);
      switch (check_exist_user) {
        case (#ok(_)) {
          Debug.trap("User already exists"); // User exists, halt execution with a trap
          return #err("User already exists");
        };
        case (#err(errorMessage)) {
          // Proceed with registration if user does not exist

          // Prepare user data for registration
          let data : UserModel.User = {
            user_id = ?owner;
            name = inputData.name;
            email = inputData.email;
            phone = inputData.phone;
            role = inputData.role;
            bio = inputData.bio;
            profileURL = inputData.profileURL;
            qualification = inputData.qualification;
            createdAt = inputData.createdAt;
            updatedAt = inputData.updatedAt;
          };

          // Attempt to register the user
          let result = await UserController.register(data);
          switch (result) {
            case (#ok(user)) {
              user_map.put(owner, user); // Add user to in-memory storage
              return #ok(user);
            };
            case (#err(errorMessage)) {
              Debug.trap(errorMessage); // Registration failed, halt execution
              return #err(errorMessage);
            };
          };

        };
      };

    } else {
      Debug.trap(Constants.not_auth_msg); // Authentication failed, halt execution
      return #err(Constants.not_auth_msg);
    };
  };

  // Function to check if a user exists
  // 📌 Important: Verifies user existence and authentication
  public shared (msg) func is_user_exist(data : ?Principal) : async Types.Result<UserModel.User, Text> {
    let owner : Principal = switch (data) {
      case (?d) { d };
      case (null) { msg.caller };
    };

    // Authenticate the owner before proceeding
    let is_authenticated = await Auth.auth_user(owner);
    if (not is_authenticated) {
      return #err(Constants.not_auth_msg); // Authentication failed
    };

    // Check for the user in the user map
    switch (user_map.get(owner)) {
      case (?user) {
        // Construct and return the complete user model if found
        let completeUser : UserModel.User = {
          user_id = user.user_id;
          name = user.name;
          email = user.email;
          phone = user.phone;
          role = user.role;
          bio = user.bio;
          profileURL = user.profileURL;
          qualification = user.qualification;
          createdAt = user.createdAt;
          updatedAt = user.updatedAt;
        };
        return #ok(completeUser);
      };
      case (null) { return #err("User does not exist") }; // User not found
    };
  };

  // Function to retrieve all registered users
  // 📌 Useful for testing and admin purposes
  public func get_all_users() : async [UserModel.User] {
    let users = Iter.toArray(user_map.vals()); // Convert users to array
    return users;
  };

  // Function to update a user profile
  // 📌 Important: Update Existing User Profile
  // public shared (msg) func update_user(inputUpdateData : UserModel.User) : async Types.Result<UserModel.User, Text> {
  //   // let owner : Principal = msg.caller
  //   let owner : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Test principal for authenticated caller

  //   let is_authenticated = await Auth.auth_user(owner);
  //   if (is_authenticated) {
  //     Debug.print("Authenticated successfully");
  //     // Check if the user already exists
  //     let check_exist_user = await is_user_exist(?owner);
  //     switch (check_exist_user) {
  //       case (#ok(_)) {

  //         // Prepare user data for registration
  //         let data : UserModel.User = {
  //           user_id = ?owner;
  //           name = inputUpdateData.name;
  //           email = inputUpdateData.email;
  //           phone = inputUpdateData.phone;
  //           role = inputUpdateData.role;
  //           bio = inputUpdateData.bio;
  //           profileURL = inputUpdateData.profileURL;
  //           qualification = inputUpdateData.qualification;
  //           createdAt = inputUpdateData.createdAt;
  //           updatedAt = inputUpdateData.updatedAt;
  //         };

  //         // Attempt to update the user
  //         let result = await UserController.update(check_exist_user, data);
  //         switch (result) {
  //           case (#ok(user)) {
  //             user_map.put(owner, user); // Add user to in-memory storage
  //             return #ok(user);
  //           };
  //           case (#err(errorMessage)) {
  //             Debug.trap(errorMessage); // Registration failed, halt execution
  //             return #err(errorMessage);
  //           };
  //         };

  //       };
  //       case (#err(errorMessage)) {
  //         Debug.trap("User Does Not Exist");
  //         return #err("User Does Not Exist");
  //       };
  //     };
  //   } else {
  //     Debug.trap(Constants.not_auth_msg); // Authentication failed, halt execution
  //     return #err(Constants.not_auth_msg);
  //   };
  // };

};
