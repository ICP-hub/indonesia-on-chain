import Result "mo:base/Result";
import Char "mo:base/Char";
import Text "mo:base/Text";
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
        university : Text;
        bio : ?Text;
        nationalId : ?Text;
        nationalIdProof : ?Text;
        profileImage : ?Text;
        experience : ?Text;
        status : ?Text;
    };

    public type UserUpdateInput = {
        name : ?Text;
        userName : ?Text;
        email : ?Text;
        phone : ?Text;
        university : ?Text;
        bio : ?Text;
        nationalId : ?Text;
        nationalIdProof : ?Text;
        profileImage : ?Text;
        experience : ?Text;
        status : ?Text;
    };

    public type UserProfile = {
        active : Bool;
        bio : Text;
        completedCourse : [Text];
        createdAt : Int;
        education : [UserModel.EducationDetails];
        email : Text;
        experience : Text;
        interest : [Text];
        isEmailVerified : Bool;
        isPhoneVerified : Bool;
        lastLoginAt : Int;
        name : Text;
        nationalId : Text;
        university : Text;
        nationalIdProof : Text;
        ongoingCourse : [Text];
        phone : Text;
        profileImage : Text;
        role : Text;
        social : [Text];
        status : Text;
        updatedAt : Int;
        userMintedCertificate : [Text];
        userName : Text;
        user_id : Text;
    };

    public type Result<T, E> = Result.Result<T, E>;

    public type Pattern = {
        #char : Char;
        #text : Text;
        #predicate : (Char -> Bool);
    };

    public type UserDashboard = {
        userMintedCertificate : Nat;
        completedCourse : Nat;
        ongoingCourse : Nat;
    };
};
