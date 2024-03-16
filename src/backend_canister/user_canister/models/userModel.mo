import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
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
    profileCoverImage : ?Text;
    qualification : ?Text;
    experience : ?Text;
    status : ?Text;
    lastLoginAt : ?Int;
    isEmailVerified : Bool;
    isPhoneVerified : Bool;
    createdAt : Int;
    updatedAt : Int;
  };
};