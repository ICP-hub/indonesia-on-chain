import UserModel "../models/userModel";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Result "mo:base/Result";
import Types "../utils/types";
import Utility "../utils/utility";

module {
  // 1. register user
  public func register(owner : Principal, data : Types.UserInput) : async Types.Result<UserModel.User, Text> {
    try {
      if (Text.size(data.name) == 0 or Text.size(data.userName) == 0 or Text.size(data.email) == 0 or Text.size(data.phone) == 0 or Text.size(data.role) == 0) {
        Debug.trap("Please fill all the required fields.");
      };

      let isEmailValid : Bool = await Utility.is_valid_email(data.email);
      let isPhoneValid : Bool = await Utility.is_valid_phone(data.phone);

      if (Text.notEqual(data.role, "educator") and Text.notEqual(data.role, "student")) {
        Debug.trap("Role must be Educator or Student");
      };

      if (isEmailValid and isPhoneValid) {

        // creating user data
        let newUser : UserModel.User = {
          user_id = owner;
          name = data.name;
          userName = data.userName;
          email = data.email;
          phone = data.phone;
          role = data.role;
          active = true;
          bio = data.bio;
          profileImage = data.profileImage;
          profileCoverImage = data.profileCoverImage;
          qualification = data.qualification;
          nationalId = data.nationalId;
          nationalIdProof = data.nationalIdProof;
          experience = data.experience;
          ongoingCourse = List.nil<Text>();
          completedCourse = List.nil<Text>();
          status = data.status;
          lastLoginAt = ?Utility.calc_current_time();
          isEmailVerified = false;
          isPhoneVerified = false;
          createdAt = Utility.calc_current_time();
          updatedAt = Utility.calc_current_time();
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
  public func update(existData : UserModel.User, updateData : Types.UserUpdateInput) : async Types.Result<UserModel.User, Text> {
    // Validate email and phone without converting nulls to "null" strings
    let isEmailValid : Bool = await Utility.is_valid_update_email(updateData.email);
    let isPhoneValid : Bool = await Utility.is_valid_update_phone(updateData.phone);

    if (isEmailValid and isPhoneValid) {
      Debug.print(debug_show ("Print from update controller"));

      // Merge new data with existing user data
      let mergedUserData : UserModel.User = {
        user_id = existData.user_id;
        name = await Utility.update_retain_value_1(updateData.name, existData.name);
        userName = await Utility.update_retain_value_1(updateData.userName, existData.userName);
        email = await Utility.update_retain_value_1(updateData.email, existData.email);
        phone = await Utility.update_retain_value_1(updateData.phone, existData.phone);
        role = existData.role; // Assuming role updates are handled differently or not allowed
        bio = await Utility.update_retain_value(updateData.bio, existData.bio);
        active = existData.active;
        profileImage = await Utility.update_retain_value(updateData.profileImage, existData.profileImage);
        profileCoverImage = await Utility.update_retain_value(updateData.profileCoverImage, existData.profileCoverImage);
        qualification = await Utility.update_retain_value(updateData.qualification, existData.qualification);
        nationalId = await Utility.update_retain_value(updateData.nationalId, existData.nationalId);
        nationalIdProof = await Utility.update_retain_value(updateData.nationalIdProof, existData.nationalIdProof);
        experience = await Utility.update_retain_value(updateData.experience, existData.experience);
        ongoingCourse = List.nil<Text>();
        completedCourse = List.nil<Text>();
        status = switch (updateData.status) {
          case (?value) { ?value };
          case (null) { existData.status };
        };
        lastLoginAt = existData.lastLoginAt;
        isEmailVerified = existData.isEmailVerified;
        isPhoneVerified = existData.isPhoneVerified;
        createdAt = existData.createdAt;
        updatedAt = Utility.calc_current_time();
      };

      // Debugging: print newUser details
      Debug.print(debug_show (mergedUserData));

      return #ok(mergedUserData);
    } else {
      return #err("Invalid email or phone number.");
    };
  };

  // 3. delete user / deactivate user

  // 4. verify phone

  // 5. vrify email
  // 6. Update ongoing course
  public func updateOngoingCourse(course_id : Text, existData : UserModel.User) : async Types.Result<UserModel.User, Text> {
    // Merge new data with existing user data
    let mergedUserData : UserModel.User = {
      user_id = existData.user_id;
      name = await Utility.update_retain_value_1(null, existData.name);
      userName = await Utility.update_retain_value_1(null, existData.userName);
      email = await Utility.update_retain_value_1(null, existData.email);
      phone = await Utility.update_retain_value_1(null, existData.phone);
      role = existData.role; // Assuming role updates are handled differently or not allowed
      bio = await Utility.update_retain_value(null, existData.bio);
      active = existData.active;
      profileImage = await Utility.update_retain_value(null, existData.profileImage);
      profileCoverImage = await Utility.update_retain_value(null, existData.profileCoverImage);
      qualification = await Utility.update_retain_value(null, existData.qualification);
      nationalId = await Utility.update_retain_value(null, existData.nationalId);
      nationalIdProof = await Utility.update_retain_value(null, existData.nationalIdProof);
      experience = await Utility.update_retain_value(null, existData.experience);
      ongoingCourse = List.push(course_id, existData.ongoingCourse);
      completedCourse = existData.completedCourse;
      status = existData.status;
      lastLoginAt = existData.lastLoginAt;
      isEmailVerified = existData.isEmailVerified;
      isPhoneVerified = existData.isPhoneVerified;
      createdAt = existData.createdAt;
      updatedAt = Utility.calc_current_time();
    };

    Debug.print(debug_show (mergedUserData));
    return #ok(mergedUserData);
  };

  // 7. update completed course
  public func updateCompletedCourse(course_id : Text, existData : UserModel.User) : async Types.Result<UserModel.User, Text> {
    // Merge new data with existing user data
    let mergedUserData : UserModel.User = {
      user_id = existData.user_id;
      name = await Utility.update_retain_value_1(null, existData.name);
      userName = await Utility.update_retain_value_1(null, existData.userName);
      email = await Utility.update_retain_value_1(null, existData.email);
      phone = await Utility.update_retain_value_1(null, existData.phone);
      role = existData.role; // Assuming role updates are handled differently or not allowed
      bio = await Utility.update_retain_value(null, existData.bio);
      active = existData.active;
      profileImage = await Utility.update_retain_value(null, existData.profileImage);
      profileCoverImage = await Utility.update_retain_value(null, existData.profileCoverImage);
      qualification = await Utility.update_retain_value(null, existData.qualification);
      nationalId = await Utility.update_retain_value(null, existData.nationalId);
      nationalIdProof = await Utility.update_retain_value(null, existData.nationalIdProof);
      experience = await Utility.update_retain_value(null, existData.experience);
      ongoingCourse = existData.ongoingCourse;
      completedCourse = List.filter(
        existData.completedCourse,
        func(item : Text) : Bool {
          return item != course_id;
        },
      );
      status = existData.status;
      lastLoginAt = existData.lastLoginAt;
      isEmailVerified = existData.isEmailVerified;
      isPhoneVerified = existData.isPhoneVerified;
      createdAt = existData.createdAt;
      updatedAt = Utility.calc_current_time();
    };

    Debug.print(debug_show (mergedUserData));
    return #ok(mergedUserData);
  };
};
