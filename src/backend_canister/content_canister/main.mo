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
import Cycles "mo:base/ExperimentalCycles";
import Result "mo:base/Result";
import QuestionModel "./models/questionModel";
import QuestionController "./controllers/questionController";
import { now } "mo:base/Time";
import Nat "mo:base/Nat";
import List "mo:base/List";

actor {
    // trie
    stable var course_trie : Trie.Trie<Text, CourseModel.Course> = Trie.empty();
    stable var course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail> = Trie.empty();

    stable var video_trie : Trie.Trie<Text, VideoModel.VideoDetail> = Trie.empty();

    stable var question_trie : Trie.Trie<Text, QuestionModel.Question> = Trie.empty();

    // let usercanister = actor ("bw4dl-smaaa-aaaaa-qaacq-cai") : actor {
    //     is_user_exist_byprincipal : (Principal) -> async Result.Result<Bool, Bool>;
    //     check_is_educator : () -> async Result.Result<Principal, Bool>;
    // };

    public shared (msg) func addCourse(course : CourseModel.Coursedetailinput) : async Text {
        if (CourseValidator.coursedetailInputvalidation(course) == false) {
            return "Enter required fields";
        };

        // let userExistsResult = await usercanister.is_user_exist_byprincipal(msg.caller);
        // Debug.print(userExistsResult);
        // Debug.print(debug_show (userExistsResult));

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
        if (CourseValidator.coursedetailvalidation(course) == false) {
            Debug.trap("Enter required fields");
        };
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

    public shared (msg) func addvideodetail(courseId : Text, video : VideoModel.VideoInput) : async Text {
        let videoId : Text = Uuid.generateUUID();
        Debug.print(videoId);
        let result = await VideoController.addvideodetail(video_trie, videoId, video);
        video_trie := result;
        let result1 = await ContentController.addvideoId(course_detail_trie, courseId, videoId, video.videoduration);
        course_detail_trie := result1;
        return "Video details added successfully";
    };

    public shared (msg) func getvideodetail(videoId : Text) : async VideoModel.VideoDetail {
        return switch (Trie.get(video_trie, Key.key videoId, Text.equal)) {
            case (?video) { video };
            case null {

                throw Error.reject("video is not present");
            };
        };
    };

    public shared (msg) func enrollbystudent(courseId : Text) : async Text {
        if (courseId == "") {
            return "enter required fields";
        };
        let result = await ContentController.enrollbystudent(course_detail_trie, courseId, msg.caller);
        course_detail_trie := result;
        return "course enrolled";

    };

    public shared (msg) func rating(courseId : Text, rating : Int) : async Text {
        if (courseId == "" or rating == 0) {
            return "Enter required fields";
        };
        let result = await ContentController.rating(course_detail_trie, courseId, msg.caller, rating);
        course_detail_trie := result;
        return "Rating successful"

    };

    public shared (msg) func videoview(courseId : Text) : async Text {
        let result = await VideoController.viewvideo(video_trie, courseId, msg.caller);
        video_trie := result;
        return "Video viewed";
    };

    public shared (msg) func addquestion(question : QuestionModel.QuestionInput, courseId : Text) : async Text {
        let questionId : Text = Uuid.generateUUID();
        let addQuestionId = await ContentController.addquestionId(course_detail_trie, courseId, questionId);
        course_detail_trie := addQuestionId;
        let newQuestionTrie = await QuestionController.addquestion(question_trie, question, questionId);
        question_trie := newQuestionTrie;
        return "question added";
    };

    public shared query (msg) func getquestion(questionId : Text) : async QuestionModel.Question {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        return switch (Trie.get(question_trie, Key.key questionId, Text.equal)) {
            case (?question) { question };
            case null {

                throw Error.reject("Question is not present");
            };
        };
    };

    public shared query (msg) func getrandomquestion(courseId : Text) : async QuestionModel.Question {

        // let questionId = await ContentController.getrandomquestionId(course_detail_trie,courseId);

        switch (Trie.get(course_detail_trie, Key.key courseId, Text.equal)) {
            case (?course) {
                let questionsCount : Nat = List.size(course.questions);
                if (questionsCount == 0) {
                    throw Error.reject("Question is not present");
                };
                let timestamp = now();
                let random_number = timestamp % questionsCount;
                let text = Int.toText(random_number);
                let natvalue = Nat.fromText(text);
                switch (natvalue) {
                    case (?nat) {
                        let mayQuestionId = List.get<Text>(course.questions, nat);

                        switch (mayQuestionId) {
                            case (?questionId) {

                                switch (Trie.get(question_trie, Key.key questionId, Text.equal)) {
                                    case (?question) { return question };
                                    case null {

                                        throw Error.reject("Question is not present");
                                    };
                                };
                            };
                            case null {
                                throw Error.reject("Question is not present");
                            };
                            case null {
                                throw Error.reject("Question is not present");
                            };
                        };

                        // return switch (Trie.get(question_trie, Key.key questionId, Text.equal)) {
                        //     case (?question) { question };
                        //     case null {

                        //         throw Error.reject("Question is not present");
                        //     };
                        // };

                    };
                };
            };
            case null {
                throw Error.reject("course is not present");
            };

        };

        // public query func main() : async Nat {
        //     let balance = Cycles.balance();
        //     return balance;
        // };

    };
};