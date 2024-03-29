import Text "mo:base/Text";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Constants "constants";
import Types "types";

module {

    // checking valid email
    public func is_valid_email(data : Text) : async Bool {
        // switch (data) {
        //     case (value) {
        //         return Text.contains(value, #text "@") and Text.contains(value, #text ".");
        //     };
        //     case (null) {
        //         return true;
        //     };
        // };
        return Text.contains(data, #text "@") and Text.contains(data, #text ".");

    };

    // checking valid phone
    public func is_valid_phone(data : Text) : async Bool {
        // switch (data) {
        //     case (value) {
        //         return Text.size(value) == Constants.phone_number_size;
        //     };
        //     case (null) {
        //         return true;
        //     };
        // };
        return Text.size(data) == Constants.phone_number_size;

    };
    // checking valid email
    public func is_valid_update_email(data : ?Text) : async Bool {
        switch (data) {
            case (?value) {
                return Text.contains(value, #text "@") and Text.contains(value, #text ".");
            };
            case (null) {
                return true;
            };
        };
        // return Text.contains(data, #text "@") and Text.contains(data, #text ".");

    };

    // checking valid phone
    public func is_valid_update_phone(data : ?Text) : async Bool {
        switch (data) {
            case (?value) {
                return Text.size(value) == Constants.phone_number_size;
            };
            case (null) {
                return true;
            };
        };
        // return Text.size(data) == Constants.phone_number_size;

    };

    public func update_retain_value(new : ?Text, exist : ?Text) : async ?Text {
        switch (new) {
            case (?value) { ?value };
            case (null) { exist };
        };
    };
    public func update_retain_value_1(new : ?Text, exist : Text) : async Text {
        switch (new) {
            case (?value) { value };
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

    public func handleList(data : ?List.List<Text>) : List.List<Text> {
        let listData : List.List<Text> = switch (data) {
            case (?value) { value };
            case (null) { List.nil<Text>() }; // Ensure an empty list if null
        };

        return listData;
    };
};
