
import Text "mo:base/Text";
import CourseModel "../models/courseModel";

module {
    public func key(t : Text) : CourseModel.Key<Text> { { hash = Text.hash t; key = t } };

};
