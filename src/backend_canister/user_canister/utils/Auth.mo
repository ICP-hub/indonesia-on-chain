import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Result "mo:base/Result";
module {
    public func auth_user(owner : Principal) : async Result.Result<Bool, Bool> {

        if (not Principal.isAnonymous(owner)) {
            #ok(true);
        } else {
            #ok(true)
        };
    };
};