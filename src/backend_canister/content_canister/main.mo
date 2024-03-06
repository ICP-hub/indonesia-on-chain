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

actor {
    stable var stable_course_map : [(Text, CourseModel.Course)] = [];
    var course_map = Map.HashMap<Text, CourseModel.Course>(0, Text.equal, Text.hash);

    stable var stable_course_detail_map : [(Text, CourseModel.CourseDetail)] = [];
    var course_detail_map = Map.HashMap<Text, CourseModel.CourseDetail>(0, Text.equal, Text.hash);

    stable var stable_video_map : [(Text, VideoModel.VideoDetail)] = [];
    var video_map = Map.HashMap<Text, VideoModel.VideoDetail>(0, Text.equal, Text.hash);

    // before upgrading canisters
    system func preupgrade() {
        stable_course_map := Iter.toArray(course_map.entries());
        stable_course_detail_map := Iter.toArray(course_detail_map.entries());
        stable_video_map := Iter.toArray(video_map.entries());
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

        let iter_val_video_map = stable_video_map.vals();
        let iter_size_video_map = stable_video_map.size();

        video_map := HashMap.fromIter<Text, VideoModel.VideoDetail>(iter_val_video_map, iter_size_video_map, Text.equal, Text.hash);
        stable_video_map := [];

    };

    public shared (msg) func addCourse(course : CourseModel.Coursedetailinput) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        await ContentController.addCourse(course_detail_map, course_map, course);
    };

    public shared query (msg) func getCourse(courseId : Text) : async CourseModel.Course {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
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
        //     Debug.trap("Anonymous caller detected");
        // };
        let courses = Iter.toArray(course_map.vals());
        return courses;
    };

    public shared (msg) func deleteCourse(courseId : Text) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        await ContentController.deleteCourse(course_detail_map, course_map, courseId);
    };

    public shared (msg) func updateCourse(course : CourseModel.CourseDetail) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        await ContentController.updateCourse(course_detail_map, course_map, course);
    };

    public shared query (msg) func getfullCourse(courseId : Text) : async CourseModel.CourseDetail {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        return switch (course_detail_map.get(courseId)) {
            case (?course) { course };
            case null {
                throw Error.reject("course is not present");
            };
        };
    };

    public shared (msg) func addvideodetail(courseId : Text, video : VideoModel.VideoInput) : async Text {
        let videoId : Text = Uuid.generateUUID();
        Debug.print(videoId);
        let result = await VideoController.addvideodetail(video_map, videoId, video);
        let result1 = await ContentController.addvideoId(course_detail_map,courseId, videoId,video.videoduration);
        return "Video details added successfully";
    };


    public shared (msg) func getvideodetail(videoId:Text) : async VideoModel.VideoDetail {
        return switch (video_map.get(videoId)) {
            case (?video) { video };
            case null {

                throw Error.reject("video is not present");
            };
        };
    };

    public shared (msg) func enrollbystudent(courseId:Text) : async Text {
        await ContentController.enrollbystudent(course_detail_map,courseId,msg.caller);
        
    };

    public shared (msg) func rating(courseId:Text,rating:Int) : async Text {
        await ContentController.rating(course_detail_map,courseId,msg.caller,rating);
    };

    public shared (msg) func videoview(courseId:Text) : async Text {
        await VideoController.viewvideo(video_map,courseId,msg.caller)
    }

    

};
