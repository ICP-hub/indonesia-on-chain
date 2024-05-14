import Text "mo:base/Text";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import Char "mo:base/Char";
import List "mo:base/List";
// import List "mo:base/List";
import Constants "constants";
import Types "types";

module {

    // checking valid email
    public func is_valid_email(data : Text) : async Bool {
        return Text.contains(data, #text "@") and Text.contains(data, #text ".");

    };

    // checking valid phone
    public func is_valid_phone(data : Text) : async Bool {
        return Text.size(data) <= Constants.phone_number_size;

    };

    // checking valid username
    public func is_valid_username(data : Text) : async Bool {
        let textArray = Text.toArray(data);

        let firstCharacter = textArray[0];

        let isAlphabetic = Char.isAlphabetic(textArray[0]);

        let isFirstCharAlpha = Char.isDigit(firstCharacter);

        Debug.print("line: 34 Checking Alphabetic");
        Debug.print(debug_show (isAlphabetic));

        return isFirstCharAlpha
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

    public func convertOptionalText(value : ?Text) : Text {
      switch(value) {
        case(?value) { value };
        case(null) { "" };
      };
    };
};
