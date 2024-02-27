import UserController "./controllers/userController";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import UserModel "./models/userModel";

import Auth "./utils/Auth";
import Types "./utils/types";
import Response "./utils/response";
import Constants "utils/constants";

actor {
  public shared (msg) func register_user(inputData : Types.InputUserData) : async Types.Response {
    // let owner : Principal = msg.caller;
    //For Test -- Autheticated Caller ✅
    let owner : Principal = Principal.fromText("un4fu-tqaaa-aaaab-qadjq-cai");

    let is_authenticated = await Auth.auth_user(owner);

    if (is_authenticated) {

      Debug.print("Authenticated successfully");

      let data : Types.UserData = {
        principal = owner;
        name = inputData.name;
        email = inputData.email;
        phone = inputData.phone;
        role = inputData.role;
      };

      return await UserController.register(data : Types.UserData);

    } else {

      Debug.print("You are not authenticated to do this action");

      return await Response.handleResponse(Constants.status_error, Constants.msg_account_created_err);
    };
  };

};
