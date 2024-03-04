import UserModel "../models/userModel";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Result "mo:base/Result";
import Response "../utils/response";
import Types "../utils/types";
import Constants "../utils/constants";
import Utility "../utils/utility";

module {
  // 1. register user
  public func register(data : UserModel.User) : async Types.Result<UserModel.User, Text> {
    try {

      let nonOptionalEmail : Text = switch (data.email) {
        case (null) { "null" };
        case (?validEmail) { validEmail };
      };

      let nonOptionalPhone : Text = switch (data.phone) {
        case (null) { "null" };
        case (?validPhone) { validPhone };
      };

      let isEmailValid = await Utility.is_valid_email(nonOptionalEmail);
      let isPhoneValid = await Utility.is_valid_phone(nonOptionalPhone);

      if (isEmailValid and isPhoneValid) {
        let newUser : UserModel.User = {
          user_id = data.user_id;
          name = data.name;
          email = data.email;
          phone = data.phone;
          role = data.role;
          bio = data.bio;
          profileURL = data.profileURL;
          qualification = data.qualification;
          createdAt = ?Utility.calc_current_time();
          updatedAt = ?Utility.calc_current_time();
        };

        // Debugging: print newUser details
        Debug.print(debug_show (newUser));

        return #ok(newUser);
      } else {
        Debug.trap("Invalid email or phone number.");
      };
    } catch e {
      let message = "Error: " # Error.message(e);
      Debug.trap(message);
    };
  };

  // 2. update user
  public func update(data : UserModel.User, updateData : UserModel.User) : async Types.Result<UserModel.User, Text> {
    try {

      let nonOptionalEmail : Text = switch (data.email) {
        case (null) { "null" };
        case (?validEmail) { validEmail };
      };

      let nonOptionalPhone : Text = switch (data.phone) {
        case (null) { "null" };
        case (?validPhone) { validPhone };
      };

      let isEmailValid = await Utility.is_valid_email(nonOptionalEmail);
      let isPhoneValid = await Utility.is_valid_phone(nonOptionalPhone);

      if (isEmailValid and isPhoneValid) {
        let newUser : UserModel.User = {
          user_id = data.user_id;
          name = data.name;
          email = data.email;
          phone = data.phone;
          role = data.role;
          bio = data.bio;
          profileURL = data.profileURL;
          qualification = data.qualification;
          createdAt = ?Utility.calc_current_time();
          updatedAt = ?Utility.calc_current_time();
        };

        // Debugging: print newUser details
        Debug.print(debug_show (newUser));

        return #ok(newUser);
      } else {
        Debug.trap("Invalid email or phone number.");
      };
    } catch e {
      let message = "Error: " # Error.message(e);
      Debug.trap(message);
    };
  };

  // 3. delete user / deactivate user

};
