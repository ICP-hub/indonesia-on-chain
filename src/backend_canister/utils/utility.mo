import Text "mo:base/Text";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import Constants "constants";
import Types "types";

module {

    // checking valid email
    public func is_valid_email(data : Text) : async Bool {
        if (data == "null") {
            return true;
        };

        return Text.contains(data, #text "@") and Text.contains(data, #text ".");
    };

    // checking valid phone
    public func is_valid_phone(data : Text) : async Bool {
        if (data == "null") {
            return true;
        };
        return Text.size(data) == Constants.phone_number_size;
    };

    // current time
    public func calc_current_time() : Int {
        let currentTime = Time.now();

        return currentTime;
    };

    // fail
    func fail(m : Text) : async () {
        Debug.trap(m);
    };

    // response
    public func handleResponse(status : Text, msg : Text) : async Types.Response {
        return {
            status = status;
            msg = msg;
        };
    };
};
