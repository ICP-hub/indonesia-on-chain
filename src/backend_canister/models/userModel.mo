import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
module {
  public type Role = {
    #educator;
    #student;
  };

  public type User = {
    user_id : ?Principal; // Internet Identity
    name : ?Text;
    role : ?Role;
    email : ?Text;
    phone : ?Text;
    active : ?Bool;
    bio : ?Text; // A short biography or description about the user
    profileImage : ?Text; //user profile picture
    profileCoverImage : ?Text; //user profile cover image
    qualification : ?Text; // User's academic or professional qualifications
    createdAt : ?Int; // Unix timestamp for creation time
    updatedAt : ?Int; // Unix timestamp for last update time
  };

};
