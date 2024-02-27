import Principal "mo:base/Principal";
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
};
