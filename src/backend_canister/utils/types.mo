import Principal "mo:base/Principal";
import Result "mo:base/Result";
import UserModel "../models/userModel";
module {
    public type Response = {
        status : Text;
        msg : Text;
    };

    public type InputUserData = {
        name : ?Text;
        role : Text;
        email : ?Text;
        phone : ?Text;
    };

    public type UserData = {
        principal : Principal;
        name : ?Text;
        role : Text;
        email : ?Text;
        phone : ?Text;
    };

    public type Result<T, E> = Result.Result<UserModel.User, Text>;
};
