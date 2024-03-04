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
          active = data.active;
          bio = data.bio;
          profileImage = data.profileImage;
          profileCoverImage = data.profileCoverImage;
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
  public func update(existData : UserModel.User, updateData : UserModel.User) : async Types.Result<UserModel.User, Text> {
    try {

      let nonOptionalEmail : Text = switch (updateData.email) {
        case (null) { "null" };
        case (?validEmail) { validEmail };
      };

      let nonOptionalPhone : Text = switch (updateData.phone) {
        case (null) { "null" };
        case (?validPhone) { validPhone };
      };

      let isEmailValid = await Utility.is_valid_email(nonOptionalEmail);
      let isPhoneValid = await Utility.is_valid_phone(nonOptionalPhone);

      if (isEmailValid and isPhoneValid) {
        Debug.print(debug_show ("Print from update controller"));
        let mergedUserData : UserModel.User = {
          user_id = existData.user_id; // user_id remains unchanged
          name = switch (updateData.name) {
            case null { existData.name };
            case (?newName) { ?newName };
          };
          email = switch (updateData.email) {
            case null { existData.email };
            case (?newEmail) { ?newEmail };
          };
          phone = switch (updateData.phone) {
            case null { existData.phone };
            case (?newPhone) { ?newPhone };
          };
          role = existData.role;
          bio = switch (updateData.bio) {
            case null { existData.bio };
            case (?newBio) { ?newBio };
          };

          active = existData.active; // Assuming this field exists and should not be updated directly
          profileImage = switch (updateData.profileImage) {
            case null { existData.profileImage };
            case (?newProfileImage) { ?newProfileImage };
          };
          profileCoverImage = switch (updateData.profileCoverImage) {
            case null { existData.profileCoverImage };
            case (?newProfileCover) { ?newProfileCover };
          };

          qualification = switch (updateData.qualification) {
            case null { existData.qualification };
            case (?newQualification) { ?newQualification };
          };
          createdAt = existData.createdAt; // Typically unchanged
          updatedAt = ?Time.now() // Set to current time
        };

        // Debugging: print newUser details
        Debug.print(debug_show (mergedUserData));

        return #ok(mergedUserData);
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
