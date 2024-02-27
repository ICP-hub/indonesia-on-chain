// // Import necessary standard libraries
// import HashMap "mo:base/HashMap";
// import Principal "mo:base/Principal";
// import Array "mo:base/Array";
// import Iter "mo:base/Iter";

// // Assuming userModel is correctly defined in the specified path
// import userModel "../models/userModel";

// actor Storage {
//     // Alias for user type for convenience
//     type User = userModel.User;

//     // Type for entries in the stable storage array
//     type NameEntry = (Principal, User);

//     // Stable storage for users, to be used across upgrades
//     stable var stableUsers : [NameEntry] = [];

//     // Runtime storage using a HashMap
//     private var users : HashMap.HashMap<Principal, User> = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);

//     // Called before a canister upgrade to serialize state
//     system func preupgrade() {
//         // Serialize the HashMap to an array for stable storage
//         stableUsers := Iter.toArray(users.entries());
//     };

//     // Called after a canister upgrade to restore state
//     system func postupgrade() {
//         // Deserialize the array back into a HashMap
//         users := HashMap.fromIter<Principal, User>(Iter.fromArray(stableUsers), 0, Principal.equal, Principal.hash);
//     };

//     // Function to add a new user
//     public func addUser(user : User) : async Bool {
//         let key = user.user_principal;
//         // Check if the user already exists to prevent duplicates
//         let exists = users.get(key) != null;
//         if (exists) {
//             return false;
//         } else {
//             // Add the new user to the HashMap
//             users.put(key, user);
//             return true;
//         };
//     };
// };

// ------------------

import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import userModel "../models/userModel";

module {
    //     // Alias for user type for convenience
    public type User = userModel.User;

    //     // Type for entries in the storage array
    //     public type NameEntry = (Principal, User);

    //     // Function to initialize the HashMap and return it
    //     func initHashMap() : HashMap.HashMap<Principal, User> {
    //         HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash)
    //     };

    //     // Runtime storage using a HashMap (Note: This will not persist across upgrades without stable storage)
    //     let users = initHashMap();

    //     // Function to add a new user
    public func addUser(user : User) : Bool {
        return true;
    };

    //     // Function to retrieve all users (demonstration purpose)
    //     public func getAllUsers() : [User] {
    //         Iter.toArray(users.vals())
    //     };
};
