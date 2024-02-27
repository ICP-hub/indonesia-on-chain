import UserModel "../models/userModel";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import StorageActor = "../utils/storage";
import Response "../utils/response";
import Types "../utils/types";
import Constants "../utils/constants";

module {
  public func register(data : Types.UserData) : async Types.Response {
    let currentTime = Time.now();

    let newUser : UserModel.User = {
      user_id = data.principal;
      name = data.name;
      email = data.email;
      phone = data.phone;
      role = data.role;
      createdAt = currentTime;
      updatedAt = currentTime;
    };

    // Add the new user
    let add_user = StorageActor.addUser(newUser);

    if (add_user) {
      return await Response.handleResponse(Constants.status_ok, Constants.msg_account_created_ok);
    } else {
      return await Response.handleResponse(Constants.status_error, Constants.msg_account_created_err);
    };

  };
};
