import ContentController "./controllers/contentController";
import VideoController "./controllers/videoController";
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
import VideoModel "models/videoModel";
import Uuid "./utility/uuid";
import Trie "mo:base/Trie";
import CourseValidator "./validations/courseValidation";
import Key "./utility/key";

actor {
    // trie
    stable var course_trie : Trie.Trie<Text, CourseModel.Course> = Trie.empty();
    stable var course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail> = Trie.empty();

    stable var video_trie : Trie.Trie<Text, VideoModel.VideoDetail> = Trie.empty();

    public shared (msg) func addCourse(course : CourseModel.Coursedetailinput) : async Text {
        if (CourseValidator.coursedetailInputvalidation(course) == false) {
            return "Enter required fields";
        };

        let uniqueId : Text = Uuid.generateUUID();

        let newCourseTrie = await ContentController.addshortcourse(course_trie, uniqueId, course);
        course_trie := newCourseTrie;

        let newCourseDetailTrie = await ContentController.addCoursedetail(course_detail_trie, uniqueId, course);
        course_detail_trie := newCourseDetailTrie;

        return "Course and course detail added successfully";
    };

    public shared query (msg) func getCourse(courseId : Text) : async CourseModel.Course {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        return switch (Trie.get(course_trie, Key.key courseId, Text.equal)) {
            case (?course) { course };
            case null {

                throw Error.reject("course is not present");
            };
        };
    };

    public shared query (msg) func getallCourse() : async Trie.Trie<Text, CourseModel.Course> {

        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        return course_trie;
    };

    public shared (msg) func deleteCourse(courseId : Text) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        let (newTrie, _) = Trie.remove(course_trie, Key.key courseId, Text.equal);
        course_trie := newTrie;

        let (newTrie1, _) = Trie.remove(course_detail_trie, Key.key courseId, Text.equal);
        course_detail_trie := newTrie1;
        return "Course deleted";

    };

    public shared (msg) func updateCourse(course : CourseModel.CourseDetail) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        let newCourseTrie = await ContentController.updateshortcourse(course_trie, course);
        course_trie := newCourseTrie;

        let newCourseDetailTrie = await ContentController.updatelongcourse(course_detail_trie, course);
        course_detail_trie := newCourseDetailTrie;
        return "course updated successfully";

    };

    public shared query (msg) func getfullCourse(courseId : Text) : async CourseModel.CourseDetail {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        return switch (Trie.get(course_detail_trie, Key.key courseId, Text.equal)) {
            case (?course) { course };
            case null {
                throw Error.reject("course is not present");
            };
        };
    };

    // public shared (msg) func addvideodetail(courseId : Text, video : VideoModel.VideoInput) : async Text {
    //     let videoId : Text = Uuid.generateUUID();
    //     Debug.print(videoId);
    //     let result = await VideoController.addvideodetail(video_map, videoId, video);
    //     let result1 = await ContentController.addvideoId(course_detail_map, courseId, videoId, video.videoduration);
    //     return "Video details added successfully";
    // };

    // public shared (msg) func getvideodetail(videoId : Text) : async VideoModel.VideoDetail {
    //     return switch (video_map.get(videoId)) {
    //         case (?video) { video };
    //         case null {

    //             throw Error.reject("video is not present");
    //         };
    //     };
    // };

    public shared (msg) func enrollbystudent(courseId : Text) : async Text {
        if (courseId == "") {
            return "enter required fields";
        };
        let result = await ContentController.enrollbystudent(course_detail_trie, courseId, msg.caller);
        course_detail_trie := result;
        return "course enrolled";

    };

    // public shared (msg) func rating(courseId : Text, rating : Int) : async Text {
    //     await ContentController.rating(course_detail_map, courseId, msg.caller, rating);
    // };

    // public shared (msg) func videoview(courseId : Text) : async Text {
    //     await VideoController.viewvideo(video_map, courseId, msg.caller);
    // };

};
