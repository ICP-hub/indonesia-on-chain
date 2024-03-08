import Text "mo:base/Text";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import Constants "constants";
import Types "types";

module {

    // checking valid email
    public func is_valid_email(data : ?Text) : async Bool {
        switch (data) {
            case (?value) {
                return Text.contains(value, #text "@") and Text.contains(value, #text ".");
            };
            case (null) {
                return true;
            };
        };

    };

    // checking valid phone
    public func is_valid_phone(data : ?Text) : async Bool {
        switch (data) {
            case (?value) {
                return Text.size(value) == Constants.phone_number_size;
            };
            case (null) {
                return true;
            };
        };

    };

    public func update_retain_value(new : ?Text, exist : ?Text) : async ?Text {
        switch (new) {
            case (?value) { ?value };
            case (null) { exist };
        };
    };

    // current time
    public func calc_current_time() : Int {
        let currentTime = Time.now();

        return currentTime;
    };

    // fail
    public func fail(m : Text) : async () {
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
