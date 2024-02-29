import UserController "./controllers/userController";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Map "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import UserModel "./models/userModel";

import Auth "./utils/Auth";
import Types "./utils/types";
import Response "./utils/response";
import Constants "utils/constants";

// ---------------------Note Start⚠️---------------------------
// *) explore other data structure to store data effectively
// *) better organization of code and provide modularity to code
// *) explore motoko new variable, features and try them in code
// ---------------------Note End⚠️-----------------------------

actor {
  stable var stable_user_map : [(Principal, UserModel.User)] = [];
  var user_map = Map.HashMap<Principal, UserModel.User>(0, Principal.equal, Principal.hash);

  // before upgrading canisters
  system func preupgrade() {
    stable_user_map := Iter.toArray(user_map.entries());
  };
  // after upgrading canisters --to preserve states
  system func postupgrade() {

    let iter_val = stable_user_map.vals();
    let iter_size = stable_user_map.size();

    user_map := HashMap.fromIter<Principal, UserModel.User>(iter_val, iter_size, Principal.equal, Principal.hash);
    stable_user_map := []; //reset array after upgrade
  };

  // Register a New User
  public shared (msg) func register_user(inputData : UserModel.User) : async Types.Result<UserModel.User, Text> {
    // let owner : Principal = msg.caller;
    //For Test -- Autheticated Caller ✅
    let owner : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");

    // un4fu-tqaaa-aaaab-qadjq-cai --correct
    // bkyz2-fmaaa-aaaaa-qaaaq-cai --can_id

    let is_authenticated = await Auth.auth_user(owner);

    if (is_authenticated) {

      Debug.print("Authenticated successfully");

      let data : UserModel.User = {
        user_id = ?owner;
        name = inputData.name; //📝Remark: optional Default = 'null'
        email = inputData.email; //📝Remark: optional Default = 'null'
        phone = inputData.phone; //📝Remark: optional Default = 'null'
        role = inputData.role; // mandatory [#Educator, #Student]
        createdAt = inputData.createdAt; //📝Remark: optional Default = 'null'   auto fill in controller handlers
        updatedAt = inputData.updatedAt; //📝Remark: optional Default = 'null'   auto fill in controller handlers
      };

      // register new user controller
      let result = await UserController.register(data);

      switch (result) {
        case (#ok(user)) {
          user_map.put(owner, user);
          return #ok(user);
        };
        case (#err(errorMessage)) {
          Debug.trap(errorMessage);
        };
      };

    } else {
      Debug.trap(Constants.not_auth_msg);
    };
  };

  // Get all Users --Test
  public func get_all_users() : async [UserModel.User] {
    // Use `Iter.toArray` to convert the iterator returned by `vals` into an array.
    let users = Iter.toArray(user_map.vals());
    return users;
  };

};
