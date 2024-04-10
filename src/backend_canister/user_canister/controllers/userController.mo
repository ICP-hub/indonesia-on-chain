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
import Constants "../utils/constants";

module {
  // 1. register user
  public func register(owner : Principal, data : Types.UserInput) : async Types.Result<UserModel.User, Text> {
    try {
      if (
        Text.size(data.name) == 0 or
        Text.size(data.userName) == 0 or
        Text.size(data.email) == 0 or
        Text.size(data.phone) == 0 or
        Text.size(data.role) == 0
      ) {
        Debug.trap("Please fill all the required fields.");
      };

      let isEmailValid : Bool = await Utility.is_valid_email(data.email);
      let isPhoneValid : Bool = await Utility.is_valid_phone(data.phone);
      let isUserNameValid : Bool = await Utility.is_valid_username(data.userName);

      Debug.print("line:31 is valid username");
      Debug.print(debug_show (isUserNameValid));

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
          education = List.nil();
          nationalId = data.nationalId;
          nationalIdProof = data.nationalIdProof;
          experience = data.experience;
          ongoingCourse = List.nil<Text>();
          completedCourse = List.nil<Text>();
          status = data.status;
          social = List.nil<Text>();
          interest = List.nil<Text>();
          lastLoginAt = ?Utility.calc_current_time();
          isEmailVerified = false;
          isPhoneVerified = false;
          createdAt = Utility.calc_current_time();
          userMintedCertificate = List.nil();
          updatedAt = Utility.calc_current_time();
        };

        // Debugging: print newUser details
        //Debug.print(debug_show (newUser));

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
      //Debug.print(debug_show ("Print from update controller"));

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
        // profileCoverImage = await Utility.update_retain_value(updateData.profileCoverImage, existData.profileCoverImage);
        education = existData.education;
        nationalId = await Utility.update_retain_value(updateData.nationalId, existData.nationalId);
        nationalIdProof = await Utility.update_retain_value(updateData.nationalIdProof, existData.nationalIdProof);
        experience = await Utility.update_retain_value(updateData.experience, existData.experience);
        ongoingCourse = existData.ongoingCourse;
        completedCourse = existData.completedCourse;
        status = switch (updateData.status) {
          case (?value) { ?value };
          case (null) { existData.status };
        };
        social = existData.social;
        interest = existData.interest;
        lastLoginAt = existData.lastLoginAt;
        isEmailVerified = existData.isEmailVerified;
        isPhoneVerified = existData.isPhoneVerified;
        createdAt = existData.createdAt;
        userMintedCertificate = existData.userMintedCertificate;
        updatedAt = Utility.calc_current_time();
      };

      // Debugging: print newUser details
      //Debug.print(debug_show (mergedUserData));

      return #ok(mergedUserData);
    } else {
      return #err("Invalid email or phone number.");
    };
  };

  // 3. Update ongoing course
  public func updateOngoingCourse(course_id : Text, existData : UserModel.User) : async Types.Result<UserModel.User, Text> {

    // check for duplicate course_id in ongoing courses
    if (List.some<Text>(existData.ongoingCourse, func c { c == course_id })) {
      Debug.trap(Constants.ongoing_course_trap);
    };

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
      // profileCoverImage = await Utility.update_retain_value(null, existData.profileCoverImage);
      education = existData.education;
      nationalId = await Utility.update_retain_value(null, existData.nationalId);
      nationalIdProof = await Utility.update_retain_value(null, existData.nationalIdProof);
      experience = await Utility.update_retain_value(null, existData.experience);
      ongoingCourse = List.push(course_id, existData.ongoingCourse);
      completedCourse = existData.completedCourse;
      status = existData.status;
      social = existData.social;
      interest = existData.interest;
      lastLoginAt = existData.lastLoginAt;
      isEmailVerified = existData.isEmailVerified;
      isPhoneVerified = existData.isPhoneVerified;
      createdAt = existData.createdAt;
      userMintedCertificate = existData.userMintedCertificate;
      updatedAt = Utility.calc_current_time();
    };

    //Debug.print(debug_show (mergedUserData));
    return #ok(mergedUserData);
  };

  // 4. update completed course
  public func updateCompletedCourse(course_id : Text, existData : UserModel.User) : async Types.Result<UserModel.User, Text> {

    // check for duplicate course_id in completed courses
    if (List.some<Text>(existData.completedCourse, func c { c == course_id })) {
      Debug.trap(Constants.completed_course_trap);
    };

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
      nationalId = await Utility.update_retain_value(null, existData.nationalId);
      nationalIdProof = await Utility.update_retain_value(null, existData.nationalIdProof);
      experience = await Utility.update_retain_value(null, existData.experience);
      ongoingCourse = List.filter(
        existData.ongoingCourse,
        func(item : Text) : Bool {
          return item != course_id;
        },
      );
      completedCourse = List.push(course_id, existData.completedCourse);
      status = existData.status;
      education = existData.education;
      social = existData.social;
      interest = existData.interest;
      lastLoginAt = existData.lastLoginAt;
      isEmailVerified = existData.isEmailVerified;
      isPhoneVerified = existData.isPhoneVerified;
      createdAt = existData.createdAt;
      userMintedCertificate = existData.userMintedCertificate;
      updatedAt = Utility.calc_current_time();
    };

    //Debug.print(debug_show (mergedUserData));
    return #ok(mergedUserData);
  };

  // 5. update users social links
  public func updateUserSocials(link : Text, existData : UserModel.User) : async Types.Result<UserModel.User, Text> {
    // check for duplicate social
    if (List.some<Text>(existData.social, func l { l == link })) {
      Debug.trap(Constants.user_social_trap);
    };

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
      nationalId = await Utility.update_retain_value(null, existData.nationalId);
      nationalIdProof = await Utility.update_retain_value(null, existData.nationalIdProof);
      experience = await Utility.update_retain_value(null, existData.experience);
      ongoingCourse = existData.ongoingCourse;
      completedCourse = existData.completedCourse;
      status = existData.status;
      education = existData.education;
      social = List.push(link, existData.social);
      interest = existData.interest;
      lastLoginAt = existData.lastLoginAt;
      isEmailVerified = existData.isEmailVerified;
      isPhoneVerified = existData.isPhoneVerified;
      createdAt = existData.createdAt;
      userMintedCertificate = existData.userMintedCertificate;
      updatedAt = Utility.calc_current_time();
    };

    //Debug.print(debug_show (mergedUserData));
    return #ok(mergedUserData);
  };

  // 6. update users interests
  public func updateUserInterest(interest : Text, existData : UserModel.User) : async Types.Result<UserModel.User, Text> {

    // check for duplicate interest
    if (List.some<Text>(existData.interest, func i { i == interest })) {
      Debug.trap(Constants.user_interest_trap);
    };

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
      // profileCoverImage = await Utility.update_retain_value(null, existData.profileCoverImage);
      education = existData.education;
      nationalId = await Utility.update_retain_value(null, existData.nationalId);
      nationalIdProof = await Utility.update_retain_value(null, existData.nationalIdProof);
      experience = await Utility.update_retain_value(null, existData.experience);
      ongoingCourse = existData.ongoingCourse;
      completedCourse = existData.completedCourse;
      status = existData.status;
      social = existData.social;
      interest = List.push(interest, existData.interest);
      lastLoginAt = existData.lastLoginAt;
      isEmailVerified = existData.isEmailVerified;
      isPhoneVerified = existData.isPhoneVerified;
      createdAt = existData.createdAt;
      userMintedCertificate = existData.userMintedCertificate;
      updatedAt = Utility.calc_current_time();
    };

    //Debug.print(debug_show (mergedUserData));
    return #ok(mergedUserData);
  };

  // 7. update mint user minted certificate
  public func updateUserMintedCertificate(course_id : Text, existData : UserModel.User) : async Types.Result<UserModel.User, Text> {

    // check for duplicate course_id in minted certificate courses
    if (List.some<Text>(existData.userMintedCertificate, func c { c == course_id })) {
      Debug.trap(Constants.minted_course_trap);
    };

    // Merge new data with existing user data
    let mergedUserData : UserModel.User = {
      user_id = existData.user_id;
      name = existData.name;
      userName = existData.name;
      email = existData.email;
      phone = existData.phone;
      role = existData.role;
      bio = existData.bio;
      active = existData.active;
      profileImage = existData.profileImage;
      nationalId = existData.nationalId;
      nationalIdProof = existData.nationalIdProof;
      experience = existData.experience;
      ongoingCourse = List.filter(
        existData.ongoingCourse,
        func(item : Text) : Bool {
          return item != course_id;
        },
      );
      completedCourse = existData.completedCourse;
      status = existData.status;
      education = existData.education;
      social = existData.social;
      interest = existData.interest;
      lastLoginAt = existData.lastLoginAt;
      isEmailVerified = existData.isEmailVerified;
      isPhoneVerified = existData.isPhoneVerified;
      createdAt = existData.createdAt;
      userMintedCertificate = List.push(course_id, existData.userMintedCertificate);
      updatedAt = existData.updatedAt;
    };

    //Debug.print(debug_show (mergedUserData));
    return #ok(mergedUserData);
  };

  // 8. update user last login
  public func updateUserLastLogin(existData : UserModel.User) : async Result.Result<UserModel.User, Text> {
    try {
      let mergedUserData : UserModel.User = {
        user_id = existData.user_id;
        name = existData.name;
        userName = existData.name;
        email = existData.email;
        phone = existData.phone;
        role = existData.role; // Assuming role updates are handled differently or not allowed
        bio = existData.bio;
        active = existData.active;
        profileImage = existData.profileImage;
        nationalId = existData.nationalId;
        nationalIdProof = existData.nationalIdProof;
        experience = existData.experience;
        ongoingCourse = existData.ongoingCourse;
        completedCourse = existData.completedCourse;
        status = existData.status;
        education = existData.education;
        social = existData.social;
        interest = existData.interest;
        lastLoginAt = ?Utility.calc_current_time();
        isEmailVerified = existData.isEmailVerified;
        isPhoneVerified = existData.isPhoneVerified;
        createdAt = existData.createdAt;
        userMintedCertificate = existData.userMintedCertificate;
        updatedAt = existData.updatedAt;
      };

      //Debug.print(debug_show (mergedUserData));
      return #ok(mergedUserData);
    } catch e {
      Debug.trap("Error:" # Error.message(e));
    };
  };

  // 9. update user education details
  public func updateUserEducation(educationData : UserModel.EducationDetails, existData : UserModel.User) : async Result.Result<UserModel.User, Text> {

    // check if user have already added education details for program(Degree/course)
    if (List.some<UserModel.EducationDetails>(existData.education, func edu { edu.program == educationData.program })) {
      Debug.trap("Already exist!");
    };

    try {
      let mergedUserData : UserModel.User = {
        user_id = existData.user_id;
        name = existData.name;
        userName = existData.name;
        email = existData.email;
        phone = existData.phone;
        role = existData.role;
        bio = existData.bio;
        active = existData.active;
        profileImage = existData.profileImage;
        nationalId = existData.nationalId;
        nationalIdProof = existData.nationalIdProof;
        experience = existData.experience;
        ongoingCourse = existData.ongoingCourse;
        completedCourse = existData.completedCourse;
        status = existData.status;
        education = List.push(educationData, existData.education);
        social = existData.social;
        interest = existData.interest;
        lastLoginAt = ?Utility.calc_current_time();
        isEmailVerified = existData.isEmailVerified;
        isPhoneVerified = existData.isPhoneVerified;
        createdAt = existData.createdAt;
        userMintedCertificate = existData.userMintedCertificate;
        updatedAt = existData.updatedAt;
      };

      return #ok(mergedUserData);
    } catch e {
      Debug.trap("Error:" # Error.message(e));
    };
  };

  // 10. remove user education details
  public func removeUserEducation(program : Text, existData : UserModel.User) : async Result.Result<UserModel.User, Text> {

    // check if user have already removed education details for program(Degree/course)
    if (List.some<UserModel.EducationDetails>(existData.education, func edu { edu.program == program })) {
      try {
        let mergedUserData : UserModel.User = {
          user_id = existData.user_id;
          name = existData.name;
          userName = existData.name;
          email = existData.email;
          phone = existData.phone;
          role = existData.role;
          bio = existData.bio;
          active = existData.active;
          profileImage = existData.profileImage;
          nationalId = existData.nationalId;
          nationalIdProof = existData.nationalIdProof;
          experience = existData.experience;
          ongoingCourse = existData.ongoingCourse;
          completedCourse = existData.completedCourse;
          status = existData.status;
          education = List.filter<UserModel.EducationDetails>(existData.education, func n { n.program != program });
          social = existData.social;
          interest = existData.interest;
          lastLoginAt = ?Utility.calc_current_time();
          isEmailVerified = existData.isEmailVerified;
          isPhoneVerified = existData.isPhoneVerified;
          createdAt = existData.createdAt;
          userMintedCertificate = existData.userMintedCertificate;
          updatedAt = existData.updatedAt;
        };

        return #ok(mergedUserData);
      } catch e {
        Debug.trap("Error:" # Error.message(e));
      };
    } else {
      Debug.trap("Education Details does not exist for this program");
    };
  };

  // 11. remove user social details
  public func removeUserSocial(link : Text, existData : UserModel.User) : async Result.Result<UserModel.User, Text> {

    // check if user have already removed social details
    if (List.some<Text>(existData.social, func l { l != link })) {

      try {
        let mergedUserData : UserModel.User = {
          user_id = existData.user_id;
          name = existData.name;
          userName = existData.name;
          email = existData.email;
          phone = existData.phone;
          role = existData.role;
          bio = existData.bio;
          active = existData.active;
          profileImage = existData.profileImage;
          nationalId = existData.nationalId;
          nationalIdProof = existData.nationalIdProof;
          experience = existData.experience;
          ongoingCourse = existData.ongoingCourse;
          completedCourse = existData.completedCourse;
          status = existData.status;
          education = existData.education;
          social = List.filter<Text>(existData.social, func n { n != link });
          interest = existData.interest;
          lastLoginAt = ?Utility.calc_current_time();
          isEmailVerified = existData.isEmailVerified;
          isPhoneVerified = existData.isPhoneVerified;
          createdAt = existData.createdAt;
          userMintedCertificate = existData.userMintedCertificate;
          updatedAt = existData.updatedAt;
        };

        return #ok(mergedUserData);
      } catch e {
        Debug.trap("Error:" # Error.message(e));
      };
    } else {
      Debug.trap("Social Link does not exist");
    };
  };

  // 12. remove user interest details
  public func removeUserInterest(interest : Text, existData : UserModel.User) : async Result.Result<UserModel.User, Text> {

    // check if user have already removed interest
    if (List.some<Text>(existData.interest, func i { i != interest })) {

      try {
        let mergedUserData : UserModel.User = {
          user_id = existData.user_id;
          name = existData.name;
          userName = existData.name;
          email = existData.email;
          phone = existData.phone;
          role = existData.role;
          bio = existData.bio;
          active = existData.active;
          profileImage = existData.profileImage;
          nationalId = existData.nationalId;
          nationalIdProof = existData.nationalIdProof;
          experience = existData.experience;
          ongoingCourse = existData.ongoingCourse;
          completedCourse = existData.completedCourse;
          status = existData.status;
          education = existData.education;
          social = existData.social;
          interest = List.filter<Text>(existData.interest, func n { n != interest });
          lastLoginAt = ?Utility.calc_current_time();
          isEmailVerified = existData.isEmailVerified;
          isPhoneVerified = existData.isPhoneVerified;
          createdAt = existData.createdAt;
          userMintedCertificate = existData.userMintedCertificate;
          updatedAt = existData.updatedAt;
        };

        return #ok(mergedUserData);
      } catch e {
        Debug.trap("Error:" # Error.message(e));
      };
    } else {
      Debug.trap("Interest does not exist");
    };
  };
};
