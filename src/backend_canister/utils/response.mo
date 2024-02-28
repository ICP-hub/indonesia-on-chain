import Types "./types";

module {
    public func handleResponse(status : Text, msg : Text) : async Types.Response {
        return {
            status = status;
            msg = msg;
            // return in obj
            // Error
        };
    };
};
