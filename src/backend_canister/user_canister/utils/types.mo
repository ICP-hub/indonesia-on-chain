import Principal "mo:base/Principal";
import Result "mo:base/Result";
import UserModel "../models/userModel";
module {
    public type Response = {
        status : Text;
        msg : Text;
    };

    public type UserInput = {
        name : Text;
        userName : Text;
        role : Text;
        email : Text;
        phone : Text;
        bio : ?Text;
        nationalId : ?Text;
        nationalIdProof : ?Text;
        profileImage : ?Text;
        profileCoverImage : ?Text;
        qualification : ?Text;
        experience : ?Text;
        status : ?Text;
    };

    public type UserUpdateInput = {
        name : ?Text;
        userName : ?Text;
        email : ?Text;
        phone : ?Text;
        bio : ?Text;
        nationalId : ?Text;
        nationalIdProof : ?Text;
        profileImage : ?Text;
        profileCoverImage : ?Text;
        qualification : ?Text;
        experience : ?Text;
        status : ?Text;
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
