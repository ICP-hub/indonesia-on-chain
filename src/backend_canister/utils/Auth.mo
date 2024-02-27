import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
module {
    public func auth_user(owner : Principal) : async Bool {

        if (Principal.isAnonymous(owner)) {
            Debug.print("Anonymous caller detected");
            return false;
        } else {
            Debug.print("Authenticated caller: " # Principal.toText(owner));
            return true;
        };
    };
};
