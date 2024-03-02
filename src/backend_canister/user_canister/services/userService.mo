import UserModel "../models/userModel";
import CanDB "../utility/candb";
import Nat "mo:base/Nat";

module {
    public func createUser(username : Text, password : Text) : async Bool {
        // Here, hash the password before storing it
        let passwordHash = hashPassword(password);
        let user = {
            id = 101; // Generate a unique ID for the user
            username = username;
            passwordHash = passwordHash;
        };
        return await CanDB.insertUser(user);
    };

    public func validateUser(username : Text, password : Text) : async Bool {
        let maybeUser = await CanDB.findUserByUsername(username);
        switch (maybeUser) {
            case (null) { return false };
            case (?user) {
                // Compare the provided password's hash with the stored hash
                return checkPasswordHash(password, user.passwordHash);
            };
        };
    };

    private func hashPassword(password : Text) : Text {
        // Implement password hashing here
        return password; // Placeholder, replace with real hashing
    };

    private func checkPasswordHash(password : Text, hash : Text) : Bool {
        // Verify the password against the hash here
        return true; // Placeholder, replace with real verification
    };
};
