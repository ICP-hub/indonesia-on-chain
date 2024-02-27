import UserController "./controllers/userController";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import UserModel "./models/userModel"; // Import UserModel to access the Role type.

actor {
  public func signUp(principal_txt : Text, name : Text, email : Text, phone : Text, role : Text) : async UserController.SignUpResponse {

    let principal_id = Principal.fromText(principal_txt);

    // signup controller
    return UserController.signUp(principal_id, name, email, phone, role);
  };
};
