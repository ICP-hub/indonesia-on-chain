import UserModel "../models/userModel";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import StorageActor = "../utils/storage"

module {
  public type SignUpResponse = {
    status : Text;
    msg : Text;
  };

  public func signUp(user_principal : Principal, name : Text, email : Text, phone : Text, role : Text) : SignUpResponse {
    // Convert Time.now() (Int) to Nat for the timestamp
    let currentTime = Int.abs(Time.now());

    let userId = currentTime + 1;

    let newUser : UserModel.User = {
      id = userId;
      user_principal = user_principal;
      name = name;
      email = ?email;
      phone = ?phone;
      role = role;
      createdAt = currentTime;
      updatedAt = currentTime;
    };

    // Add the new user
    let add_user = StorageActor.addUser(newUser);

    if (add_user) {
      return {
        status = "success";
        msg = "Account Created";
      };
    } else {
      return {
        status = "failure";
        msg = "Account Not Created";
      };
    };

  };
};
