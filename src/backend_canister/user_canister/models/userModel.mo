import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import List "mo:base/List";
module {

  // public type Role = {
  //   #educator;
  //   #student;
  // };

  // public type Status = {
  //   #online;
  //   #busy;
  //   #away;
  // };

  public type User = {
    user_id : Principal;
    name : Text;
    userName : Text;
    role : Text;
    email : Text;
    phone : Text;
    active : Bool;
    bio : ?Text;
    nationalId : ?Text;
    nationalIdProof : ?Text;
    profileImage : ?Text;
    qualification : ?Text;
    university : ?Text;
    degree : ?Text;
    cgpa : ?Text;
    experience : ?Text;
    ongoingCourse : List.List<Text>;
    completedCourse : List.List<Text>;
    social : ?List.List<Text>;
    interest : ?List.List<Text>;
    status : ?Text;
    lastLoginAt : ?Int;
    isEmailVerified : Bool;
    isPhoneVerified : Bool;
    createdAt : Int;
    updatedAt : Int;
  };
};
