import UserController "./controllers/userController";
import Nat "mo:base/Nat";
import Random "mo:base/Random";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";

actor {
  public func signUp(username : Text, password : Text) : async Bool {
    return await UserController.signUp(username, password);
  };

  public func login(username : Text, password : Text) : async Bool {
    return await UserController.login(username, password);
  };
};
