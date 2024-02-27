import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
module {
  public type Role = {
    #Educator;
    #Student;
  };

  public type User = {
    user_id : Principal; // Internet Identity
    name : ?Text;
    role : Text;
    email : ?Text;
    phone : ?Text;
    createdAt : Int; // Unix timestamp for creation time
    updatedAt : Int; // Unix timestamp for last update time
  };
};
