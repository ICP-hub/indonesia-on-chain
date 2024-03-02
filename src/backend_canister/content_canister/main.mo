import ContentController "./controllers/contentController";
import Text "mo:base/Text";
import Map "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import CourseModel "./models/courseModel";
import Int "mo:base/Int";
import Error "mo:base/Error";
import Principal "mo:base/Principal";

actor {
    stable var stable_course_map : [(Text, CourseModel.Course)] = [];
    var course_map = Map.HashMap<Text, CourseModel.Course>(0, Text.equal, Text.hash);

    stable var stable_course_detail_map : [(Text, CourseModel.CourseDetail)] = [];
    var course_detail_map = Map.HashMap<Text, CourseModel.CourseDetail>(0, Text.equal, Text.hash);

    // before upgrading canisters
    system func preupgrade() {
        stable_course_map := Iter.toArray(course_map.entries());
        stable_course_detail_map := Iter.toArray(course_detail_map.entries());
    };
    // after upgrading canisters --to preserve states
    system func postupgrade() {

        let iter_val_course_map = stable_course_map.vals();
        let iter_size_course_map = stable_course_map.size();

        course_map := HashMap.fromIter<Text, CourseModel.Course>(iter_val_course_map, iter_size_course_map, Text.equal, Text.hash);
        stable_course_map := []; //reset array after upgrade

        let iter_val_course_detail_map = stable_course_detail_map.vals();
        let iter_size_course_detail_map = stable_course_detail_map.size();

        course_detail_map := HashMap.fromIter<Text, CourseModel.CourseDetail>(iter_val_course_detail_map, iter_size_course_detail_map, Text.equal, Text.hash);
        stable_course_detail_map := [];
    };

    public shared (msg) func addCourse(course : CourseModel.Coursedetailinput) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        await ContentController.addCourse(course_detail_map,course_map, course);
    };

    public shared query (msg) func getCourse(courseId : Text) : async CourseModel.Course {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.print("Anonymous caller detected");
        //     throw Error.reject("Anonymous caller detected");
        // };
        return switch (course_map.get(courseId)) {
            case (?course) { course };
            case null {

                throw Error.reject("course is not present");
            };
        };
    };

    public shared query (msg) func getallCourse() : async [CourseModel.Course] {

        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.print("Anonymous caller detected");
        //     throw Error.reject("Anonymous caller detected");
        // };
        let courses = Iter.toArray(course_map.vals());
        return courses;
    };

    public shared (msg) func deleteCourse(courseId : Text) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.print("Anonymous caller detected");
        //     throw Error.reject("Anonymous caller detected");
        // };
        await ContentController.deleteCourse(course_map, courseId);
    };

    public shared (msg) func updateCourse(course : CourseModel.Course) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.print("Anonymous caller detected");
        //     throw Error.reject("Anonymous caller detected");
        // };
        await ContentController.updateCourse(course_map, course);
    };

     public shared query (msg) func getfullCourse(courseId : Text) : async CourseModel.CourseDetail {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.print("Anonymous caller detected");
        //     throw Error.reject("Anonymous caller detected");
        // };
        return switch (course_detail_map.get(courseId)) {
            case (?course) { course };
            case null {

                throw Error.reject("course is not present");
            };
        };
    };

};
