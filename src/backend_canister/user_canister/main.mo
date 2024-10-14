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
import Utility "utils/utility";
import Array "mo:base/Array";

// 🛠️ Actor declaration begins here
shared actor class User_canister() = Self {
  stable var stable_user_map : [(Principal, UserModel.User)] = [];
  
  var user_map = TMap.TrieMap<Principal, UserModel.User>(Principal.equal, Principal.hash);
  
  stable var stable_course_marks : [(Principal, {courseId : Text ; total_marks : Float ;obtained_marks : Float})] = [];
  
  var user_course_obtained_marks = TMap.TrieMap<Principal, {courseId : Text ; total_marks : Float; obtained_marks : Float}>(Principal.equal, Principal.hash);
  
  
  // Pre-upgrade hook to save state to stable storage
  system func preupgrade() {
    stable_user_map := Iter.toArray(user_map.entries());
    stable_course_marks := Iter.toArray(user_course_obtained_marks.entries());
  };

  // Post-upgrade hook to restore state from stable storage
  system func postupgrade() {
    let user_data_vals = stable_user_map.vals();

    user_map := TrieMap.fromEntries<Principal, UserModel.User>(user_data_vals, Principal.equal, Principal.hash);
    stable_user_map := [];

    let course_marks_vals = stable_course_marks.vals();
    user_course_obtained_marks := TrieMap.fromEntries<Principal, {courseId : Text ; total_marks : Float ;obtained_marks : Float}>(course_marks_vals, Principal.equal, Principal.hash);
  };


  //check is Educator code start
  let IC = actor "aaaaa-aa" : actor {
    canister_status : { canister_id : Principal } -> async {
      settings : { controllers : [Principal] }
    };
  };

  public shared (install) func get_controllers(canister_id : Principal) : async [Principal] {
    Debug.print(debug_show(canister_id));
    let status = await IC.canister_status({ canister_id = canister_id });
    return status.settings.controllers;
  };

  public query ({caller}) func get_caller():async Principal{
    return caller;
  };
  
  //check is Educator code end

  public shared(msg) func isController(canister_id : Principal,principal_id : Principal) : async Bool {
      let status = await IC.canister_status({ canister_id = canister_id });
      return contains(status.settings.controllers, principal_id);
  };

  func contains(arr: [Principal], value: Principal): Bool {
      var found = false;
      for (item in arr.vals()) {
      if (item == value) {
          found := true;
      };
      };
      return found;
  };
  //check is Educator code end


  // 📌 Function to get user data
  public query ({ caller }) func get_user_info() : async Types.Result<Types.UserProfile, Text> {

    // assert not Principal.isAnonymous(caller);

    // let is_authenticated = Auth.auth_user(caller);
    if (Principal.isAnonymous(caller)) {
            Debug.trap("Anonymous caller detected");
        };

    // switch (is_authenticated) {
      // case (#ok(value)) {
        // Check for the user in the user map
        switch (user_map.get(caller)) {
          case (?user) {

            let userData = {
              user_id = Principal.toText(user.user_id);
              name = user.name;
              userName = user.userName;
              role = user.role;
              email = user.email;
              phone = user.phone;
              active = user.active;
              university= user.university;
              bio = Utility.convertOptionalText(user.bio);
              nationalId = Utility.convertOptionalText(user.nationalId);
              nationalIdProof = Utility.convertOptionalText(user.nationalIdProof);
              profileImage = Utility.convertOptionalText(user.profileImage);
              education = List.toArray(user.education);
              experience = Utility.convertOptionalText(user.experience);
              ongoingCourse = List.toArray(user.ongoingCourse);
              completedCourse = List.toArray(user.completedCourse);
              userMintedCertificate = List.toArray(user.userMintedCertificate);
              social = List.toArray(user.social);
              interest = List.toArray(user.interest);
              status = Utility.convertOptionalText(user.status);
              lastLoginAt = switch (user.lastLoginAt) {
                case (?value) { value };
                case (null) { 0 };
              };
              isEmailVerified = user.isEmailVerified;
              isPhoneVerified = user.isPhoneVerified;
              createdAt = user.createdAt;
              updatedAt = user.updatedAt;
            };

            return #ok(userData);
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
    //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };
        
  };

  // 📌 Function to check if a user exists
  public query ({ caller }) func is_user_exist() : async Result.Result<Bool, Bool> {

    // let is_authenticated = Auth.auth_user(caller);
    // if (Principal.isAnonymous(caller)) {
    //         Debug.trap("Anonymous caller detected");
    //     };

    // switch (is_authenticated) {
      // case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            return #ok(true); // replace true = value later
          };
          case (null) { return #err(false) }; //📌  User not found
        };
      // };
      // case (#err(error)) {
        // Debug.trap(Constants.not_auth_msg);
      // };
    // };
  };

  public shared ({caller}) func is_certificate_minted (courseId : Text): async Bool {
    // let is_authenticated = Auth.auth_user(caller);
    if (Principal.isAnonymous(caller)) {
            Debug.trap("Anonymous caller detected");
        };

    // switch (is_authenticated) {
      // case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            let userMintedCertificate  = List.find(user.userMintedCertificate, func (x : Text) : Bool{
              x == courseId;
            });
            switch (userMintedCertificate) {
              case (?value) {
                return true;
              };
              case (null) {
                return false;
              };
            };
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
      // };
      // case (#err(error)) {
        // Debug.trap(Constants.not_auth_msg);
      // };
    // };
  };

  // 📌 Function to register a new user
  public shared ({ caller }) func register_user(inputData : Types.UserInput) : async Types.Result<UserModel.User, Text> {

    // let is_authenticated = Auth.auth_user(caller);
    if (Principal.isAnonymous(caller)) {
            Debug.trap("Anonymous caller detected");
        };

    // switch (is_authenticated) {
      // case (#ok(value)) {
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
      // };
      // case (#err(error)) {
        // Debug.trap(Constants.not_auth_msg);
      // };
    // };
  };

  // 📌 Function to update a user profile
  public shared ({ caller }) func update_user(inputUpdateData : Types.UserUpdateInput) : async Types.Result<UserModel.User, Text> {

    // let is_authenticated = Auth.auth_user(caller);
    if (Principal.isAnonymous(caller)) {
            Debug.trap("Anonymous caller detected");
        };

    // switch (is_authenticated) {
      // case (#ok(value)) {
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
      // };
      // case (#err(error)) {
        // Debug.trap(Constants.not_auth_msg);
      // };
    // };
  };

  // 📌 Check cycles balance
  public shared ({caller}) func check_cycle_balance() : async Nat {
     if (Principal.isAnonymous(caller)) {
            Debug.trap("Anonymous caller detected");
        };
            let canisterId = Principal.fromActor(Self);
        // Check if the caller is one of the controllers
        let controllerResult = await isController(canisterId,caller);
        if (controllerResult == false) {
        return Debug.trap("Unauthorized: Only controllers can add a course.");
  
        };
    let balance = Cycles.balance();
    Debug.print("Balance: " # debug_show (balance));
    return balance;
  };

  // 📌 Function to check if user is educator or not
  public query func check_is_educator(userId : Principal) : async Result.Result<Principal, Bool> {
    // let is_authenticated = Auth.auth_user(userId);

    // switch (is_authenticated) {
      // case (#ok(_)) {
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
      // };
      // case (#err(error)) {
        // Debug.trap(Constants.not_auth_msg);
      // };
    // };
  };

  // 📌 Update ongoing course
  public shared ({ caller }) func updateOngoingCourse(courseId : Text) : async Types.Result<Text, Text> {
    // let is_authenticated = Auth.auth_user(caller);
    if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };

    // switch (is_authenticated) {
      // case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController.update function
            let result = await UserController.updateOngoingCourse(courseId, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok(Constants.ongoing_course_success);
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
      // };
      // case (#err(error)) {
        // Debug.trap(Constants.not_auth_msg);
      // };
    // };
  };

  // 📌 Update completed course
  public shared ({ caller }) func updateCompletedCourse(courseId : Text) : async Types.Result<Text, Text> {
    // let is_authenticated = Auth.auth_user(caller);
    if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // switch (is_authenticated) {
    //   case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController.update function
            let result = await UserController.updateCompletedCourse(courseId, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok(Constants.completed_course_success);
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
    //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };
  };

  // 📌 Update Socials
  public shared ({ caller }) func updateUserSocials(link : Text) : async Types.Result<Text, Text> {
    // let is_authenticated = Auth.auth_user(caller);
if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // switch (is_authenticated) {
      // case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController.update function
            let result = await UserController.updateUserSocials(link, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok(Constants.user_social_success);
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
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };
  };

  // 📌 Update Interest
  public shared ({ caller }) func updateUserInterest(interest : Text) : async Types.Result<Text, Text> {
    // let is_authenticated = Auth.auth_user(caller);
if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // switch (is_authenticated) {
      // case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController.update function
            let result = await UserController.updateUserInterest(interest, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok(Constants.user_interest_success);
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
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };
  };

  // 📌 Update User Minted Certificate
  public shared ({ caller }) func updateUserMintedCertificate(courseId : Text) : async Types.Result<Text, Text> {
    // let is_authenticated = Auth.auth_user(caller);
if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // switch (is_authenticated) {
      // case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController updateUserMintedCertificate function
            let result = await UserController.updateUserMintedCertificate(courseId, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok(Constants.mint_certificate_success);
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
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };
  };

  public shared ({caller = user}) func get_user_dashboard() : async Types.Result<Types.UserDashboard, Text> {
    if (Principal.isAnonymous(user)) {
          Debug.trap("Anonymous caller detected");
      };
    let is_authenticated = Auth.auth_user(user);
    // switch (is_authenticated) {
      // case (#ok(value)) {
        switch (user_map.get(user)) {
          case (?user) {
            let dashboardData = {
              ongoingCourse = Array.size(List.toArray(user.ongoingCourse));
              completedCourse = Array.size(List.toArray(user.completedCourse));
              userMintedCertificate = Array.size(List.toArray(user.userMintedCertificate));
            };
            return #ok(dashboardData);
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };
  };

  // 📌 Update User Minted Certificate
  public shared ({ caller }) func updateUserEducation(educationData : UserModel.EducationDetails) : async Result.Result<Text, Text> {
    if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // let is_authenticated = Auth.auth_user(caller);

    // switch (is_authenticated) {
      // case (#ok(value)) {
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController updateUserMintedCertificate function
            let result = await UserController.updateUserEducation(educationData, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok(Constants.education_details_succcess);
              };
              case (#err(errorMessage)) {
                Debug.trap(errorMessage);
              };
            };
          };
          case (null) {
            Debug.trap(Constants.user_not_exist);
          };
        };
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };
  };


  // 📌 Function to get user's ongoing courses
  public query ({ caller }) func get_user_ongoingcourse() : async [Text] {
if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // assert not Principal.isAnonymous(caller);

    // let is_authenticated = Auth.auth_user(caller);

    // switch (is_authenticated) {
      // case (#ok(value)) {
        // Check for the user in the user map
        switch (user_map.get(caller)) {
          case (?user) {
            return List.toArray(user.ongoingCourse);
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };

  };

  // 📌 Function to get user's completed courses
  public query ({ caller }) func get_user_completedcourse() : async [Text] {
    if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // assert not Principal.isAnonymous(caller);
    // let is_authenticated = Auth.auth_user(caller);
    // switch (is_authenticated) {
      // case (#ok(value)) {
        // Check for the user in the user map
        switch (user_map.get(caller)) {
          case (?user) {
            return List.toArray(user.completedCourse);
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };
  };

  // 📌 Function to Get User Minted Certificates
public query ({ caller }) func getUserMintedCertificate() : async [Text] {
if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // let is_authenticated = Auth.auth_user(caller);

    // switch (is_authenticated) {
      // case (#ok(value)) {
        // Check for the user in the user map
        switch (user_map.get(caller)) {
          case (?user) {
            return List.toArray(user.userMintedCertificate);
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };

  }; 



  // 📌 Function to remove User Education
  public shared ({ caller }) func removeUserEducation(program : Text) : async Result.Result<Text, Text> {
if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // let is_authenticated = Auth.auth_user(caller);

    // switch (is_authenticated) {
      // case (#ok(value)) {
        // Check for the user in the user map
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController updateUserMintedCertificate function
            let result = await UserController.removeUserEducation(program, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok("Removed!");
              };
              case (#err(errorMessage)) {
                Debug.trap(errorMessage);
              };
            };
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };

  };

  // 📌 Function to remove User Social
  public shared ({ caller }) func removeUserSocial(link : Text) : async 
  Result.Result<Text, Text> {
if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // let is_authenticated = Auth.auth_user(caller);

    // switch (is_authenticated) {
      // case (#ok(value)) {
        // Check for the user in the user map
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController updateUserMintedCertificate function
            let result = await UserController.removeUserSocial(link, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok("Removed!");
              };
              case (#err(errorMessage)) {
                Debug.trap(errorMessage);
              };
            };
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };

  };

  // 📌 Function to remove User interest
  public shared ({ caller }) func removeUserInterest(interest : Text) : async Result.Result<Text, Text> {
Debug.print(debug_show (caller));
    // let is_authenticated = Auth.auth_user(caller);
if (Principal.isAnonymous(caller)) {
          Debug.trap("Anonymous caller detected");
      };
    // switch (is_authenticated) {
      // case (#ok(value)) {
        // Check for the user in the user map
        switch (user_map.get(caller)) {
          case (?user) {
            // Pass both existing and new data to the UserController updateUserMintedCertificate function
            let result = await UserController.removeUserInterest(interest, user);

            switch (result) {
              case (#ok(user)) {
                user_map.put(caller, user);
                return #ok("Removed!");
              };
              case (#err(errorMessage)) {
                Debug.trap(errorMessage);
              };
            };
          };
          case (null) {
            Debug.trap("User does not exist");
          }; // User not found
        };
          //   };
    //   case (#err(error)) {
    //     Debug.trap(Constants.not_auth_msg);
    //   };
    // };

  };

  // 🛠️ Test Functions

  // Function to retrieve all registered users
  // Useful for testing and admin purposes
  public shared (msg) func get_all_users() : async [UserModel.User] {
    if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };
        let canisterId = Principal.fromActor(Self);
    
        // Check if the caller is one of the controllers
        let controllerResult = await isController(canisterId,msg.caller);
    
        if (controllerResult == false) {
        Debug.trap("Unauthorized: Only controllers can add a course.");
        // return [];
        };
    let users = Iter.toArray(user_map.vals()); // Convert users to array
    return users;
  };

  public query ({caller}) func get_user (student : Principal) : async UserModel.User {
    if (Principal.isAnonymous(caller)) {
            Debug.trap("Anonymous caller detected");
        };
    let user = user_map.get(student);
    switch (user) {
      case (?value) {
        return value;
      };
      case (null) {
        Debug.trap("User does not exist");
      };
    };
  };

  // ⚠️ Function to delete user (user can do itself----for testing) ----in real world scenarios admin will delete user and user can only deactivate itself
  // Useful for testing and admin purposes
  public shared (msg) func delete_user() : async Result.Result<Text, Text> {
    if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };
    let canisterId = Principal.fromActor(Self);
        // Check if the caller is one of the controllers
        let controllerResult = await isController(canisterId,msg.caller);
        if (controllerResult == false) {
        return #err("Unauthorized: Only controllers can add a course.");
  
        };
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

  public shared ({caller}) func update_course_obtained_marks (CourseId : Text, obtained_marks : Float , total_marks : Float,pre_obtained_marks : Float , pre_total_marks : Float) : async Result.Result<Text, Text> {
    if (Principal.isAnonymous(caller)) {
            Debug.trap("Anonymous caller detected");
        };
    let is_authenticated = Auth.auth_user(caller);
    switch (is_authenticated) {
      case (#ok(value)) {
        let previous_marks = user_course_obtained_marks.get(caller);
        switch (previous_marks) {
          case (?value) {
            let updated_marks = obtained_marks + value.obtained_marks - pre_obtained_marks;
            let total_updated_marks = total_marks + value.total_marks - pre_total_marks;
            user_course_obtained_marks.put(caller, {courseId = CourseId; total_marks = total_updated_marks; obtained_marks = updated_marks;});
            return #ok("Course Marks Updated");
          };
          case (null) {
            user_course_obtained_marks.put(caller, {courseId = CourseId;total_marks = total_marks; obtained_marks = obtained_marks});
            return #ok("Your new marks are " # debug_show(obtained_marks)); 
          };
        };

      };
      case (#err(error)) {
        return #err(Constants.not_auth_msg);
      };
    };
  };

  public shared ({caller}) func get_user_marks () : async Result.Result<{total_marks :Float ;obtained_marks :Float;}, Text> {
    if (Principal.isAnonymous(caller)) {
            Debug.trap("Anonymous caller detected");
        };
    let is_authenticated = Auth.auth_user(caller);
    switch (is_authenticated) {
      case (#ok(value)) {
        let marks = user_course_obtained_marks.get(caller);
        switch (marks) {
          case (?value) {
            return #ok({total_marks = value.total_marks;
            obtained_marks = value.obtained_marks;});
          };
          case (null) {
            return #err("No marks found");
          };
        };
      };
      case (#err(error)) {
        return #err(Constants.not_auth_msg);
      };
    };
  };

  // ⚠️ Function to delete all users
  public shared (msg) func delete_all_user() : async Result.Result<Text, Text> {
    if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };
            let canisterId = Principal.fromActor(Self);
        // Check if the caller is one of the controllers
        let controllerResult = await isController(canisterId,msg.caller);
        if (controllerResult == false) {
        return #err("Unauthorized: Only controllers can add a course.");
  
        };
    try {
      let owner : Principal = msg.caller;
      let is_authenticated = Auth.auth_user(owner);

      switch (is_authenticated) {
        case (#ok(value)) {

          for (key in user_map.keys()) {
            user_map.delete(key);
          };

          stable_user_map := [];

          return #ok("All Users Deleted");
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
};
