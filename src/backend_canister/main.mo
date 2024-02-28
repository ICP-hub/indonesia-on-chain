import UserController "./controllers/userController";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Map "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import UserModel "./models/userModel";

import Auth "./utils/Auth";
import Types "./utils/types";
import Response "./utils/response";
import Constants "utils/constants";

actor {
  stable var stable_user_map : [(Principal, UserModel.User)] = [];
  var user_map = Map.HashMap<Principal, UserModel.User>(0, Principal.equal, Principal.hash);

  system func preupgrade() {
    stable_user_map := Iter.toArray(user_map.entries());
  };

  system func postupgrade() {
    // Initialize the HashMap with the appropriate capacity and hash functions.
    user_map := Map.HashMap<Principal, UserModel.User>(0, Principal.equal, Principal.hash);

    // Iterate over the array of tuples.
    for (item in stable_user_map.vals()) {
      // Destructure each tuple into `key` and `value`.
      let (key, value) = item;
      // Insert each key-value pair back into the HashMap.
      user_map.put(key, value);
    };
  };

  // Register a New User
  public shared (msg) func register_user(inputData : UserModel.User) : async Types.Result<UserModel.User, Text> {
    // let owner : Principal = msg.caller;
    //For Test -- Autheticated Caller ✅
    let owner : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
    // un4fu-tqaaa-qaaab-qadjq-cai
    // bk4fu-tqaaa-aaaab-qadjq-cai
    // un4fu-tqaaa-aaaab-qadjq-cai --correct
    // bkyz2-fmaaa-aaaaa-qaaaq-cai --can_id
    // q22xz-3ab5g-4czee-fji5t-cfwrr-xz3ol-tyivb-ttlkk-evxr3-roo3e-kqe

    let is_authenticated = await Auth.auth_user(owner);

    if (is_authenticated) {

      Debug.print("Authenticated successfully");

      let data : UserModel.User = {
        user_id = ?owner;
        name = inputData.name;
        email = inputData.email;
        phone = inputData.phone;
        role = inputData.role;
        createdAt = inputData.createdAt;
        updatedAt = inputData.updatedAt;
      };

      // register new user controller
      let result = await UserController.register(data);

      switch (result) {
        case (#ok(user)) {
          user_map.put(owner, user);
          return #ok(user);
        };
        case (#err(errorMessage)) {
          return #err(errorMessage);
        };
      };

    } else {
      Debug.print("You are not authenticated to do this action");
      return #err("You are not authenticated to do this action");
    };
  };

  // Get all Users --Test
  public func get_all_users() : async [UserModel.User] {
    // Use `Iter.toArray` to convert the iterator returned by `vals` into an array.
    let users = Iter.toArray(user_map.vals());
    return users;
  };

};
