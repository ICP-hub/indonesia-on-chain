import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Nat "mo:base/Nat";
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

  public type EducationDetails = {
    institution: Text; // University or School
    program: Text; // Degree or Course or Grade (for standard from 1 to 12)
    score: Int; // Percentage or CGPA
  };

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
    education:List.List<EducationDetails>; //contain more than one eductaion details
    experience : ?Text;
    ongoingCourse : List.List<Text>;
    completedCourse : List.List<Text>;
    userMintedCertificate:List.List<Text>;
    social : List.List<Text>;
    interest : List.List<Text>;
    status : ?Text;
    lastLoginAt : ?Int;
    isEmailVerified : Bool;
    isPhoneVerified : Bool;
    createdAt : Int;
    updatedAt : Int;
  };
};
