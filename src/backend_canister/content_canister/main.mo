import ContentController "./controllers/contentController";
import VideoController "./controllers/videoController";
import Text "mo:base/Text";
import Map "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import CourseModel "./models/courseModel";
import ActorModel "./models/actorModel";
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
import Blob "mo:base/Blob";
import nft "../nft/main";
import nftModel "./models/nftModel";
import ArticleController "controllers/articleController";
import ArticleModel "models/articleModel";
import TestModel "./models/testModel";
import TestController "./controllers/testController";

shared actor class Content_canister() = Self {
    // trie
    stable var course_trie : Trie.Trie<Text, CourseModel.Course> = Trie.empty();
    stable var course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail> = Trie.empty();

    stable var article_trie : Trie.Trie<Text, ArticleModel.Article> = Trie.empty();

    stable var video_trie : Trie.Trie<Text, VideoModel.VideoDetail> = Trie.empty();

    stable var test_trie:Trie.Trie<Text,TestModel.Test> =Trie.empty();

    stable var question_trie : Trie.Trie<Text, QuestionModel.Question> = Trie.empty();

    stable var result_trie : Trie.Trie<Text, Nat> = Trie.empty();

    stable var coursetrack_trie : Trie.Trie<Text, List.List<Text>> = Trie.empty();
    
    stable var testrack_trie : Trie.Trie<Text, List.List<Text>> = Trie.empty();
    
    // let usercanister = actor ("bw4dl-smaaa-aaaaa-qaacq-cai") : actor {
    //     is_user_exist_byprincipal : (Principal) -> async Result.Result<Bool, Bool>;
    //     check_is_educator : () -> async Result.Result<Principal, Bool>;
    // };


      //check is Educator code start
    let IC = actor "aaaaa-aa" : actor {
        canister_status : { canister_id : Principal } -> async {
        settings : { controllers : [Principal] }
        };
    };

    public shared(msg) func isController(canister_id : Principal,principal_id : Principal) : async Bool {
        let status = await IC.canister_status({ canister_id = canister_id });
        return contains(status.settings.controllers, principal_id);
    };

    func contains(arr: [Principal], value: Principal): Bool {
        var found = false;
        for (item in arr.vals()) {
        if (item == value) {
            found := true;
        };
        };
        return found;
    };
  //check is Educator code end

    public shared (msg) func addCourse(course : CourseModel.Coursedetailinput) : async Result.Result<CourseModel.Coursedetailinput, Text> {
        if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };
        let canisterId = Principal.fromActor(Self);
        // Check if the caller is one of the controllers
        let controllerResult = await isController(canisterId,msg.caller);
    
        if (controllerResult == false) {
        return #err("Unauthorized: Only controllers can add a course.");
        };

        if (CourseValidator.coursedetailInputvalidation(course) == false) {
            return #err("Enter required fields");
        };
        var canisterid = Principal.fromActor(Self);
        Debug.print(debug_show ("mint", canisterid));
         Cycles.add<system>(300_000_000_000);
        // Cycles.add<system>(20_000_000_000);

        let balance = Cycles.balance();
        Debug.print("Balance: " # debug_show (balance));
        // Cycles.add(300_000_000_000);
        let logosample : nftModel.LogoResult = {
            logo_type = "image/png";
            data = course.courseImg;

        };
        let input : nftModel.Dip721NonFungibleToken = {
            logo = logosample;
            name = course.courseTitle;
            symbol = "image/png";
            maxLimit = 50;
        };
//    ---------------NFT CALL----------------
        let actor1 = await nft.Dip721NFT(canisterid, input);
        let nftcanister = await actor1.getcanisterId();
        let nftcanisterId = Principal.toText(nftcanister);
        Debug.print(debug_show (nftcanisterId));

        // let userExistsResult = await usercanister.is_user_exist_byprincipal(msg.caller);
        // Debug.print(userExistsResult);
        // Debug.print(debug_show (userExistsResult));

        let uniqueId : Text = Uuid.generateUUID();
        Debug.print("The new course id is" # debug_show (uniqueId));

        let new_course : CourseModel.Coursedetailinput = {
            courseId = uniqueId;
            courseTitle = course.courseTitle;
            courseImg = course.courseImg;
            shortdescription = course.shortdescription;
            longdescription = course.longdescription;
            videoidlist = List.nil<Text>();
            enrollmentuserId = List.nil<Principal>();
            rating = 0;
            questions = List.nil<Text>();
            nftcanisterId = nftcanisterId;
            videocount = 0;
            certificateimg = "";
            duration = course.duration;
            level = course.level;
            viewcount = 0;
            viewlist = List.nil<Text>();
            enrollmentcount = 0;
            learningpoints = course.learningpoints;
            totaltestmarks = 0.0;
            totalpassingmarks = 0.0;
            coursetype = course.coursetype;
            professorName = course.professorName;
            professorId = course.professorId;
            upload_date = now();
        };

        let newCourseTrie = await ContentController.addshortcourse(course_trie, uniqueId, new_course, nftcanisterId);
        course_trie := newCourseTrie;

        let newCourseDetailTrie = await ContentController.addCoursedetail(course_detail_trie, uniqueId, new_course, nftcanisterId);
        course_detail_trie := newCourseDetailTrie;

        return #ok(new_course);

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
        if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };

        let canisterId = Principal.fromActor(Self);
        // Check if the caller is one of the controllers
        let controllerResult = await isController(canisterId,msg.caller);
    
        if (controllerResult == false) {
        return ("Unauthorized: Only controllers can delete a course.");
        };

        let (newTrie, _) = Trie.remove(course_trie, Key.key courseId, Text.equal);
        course_trie := newTrie;

        let (newTrie1, _) = Trie.remove(course_detail_trie, Key.key courseId, Text.equal);
        course_detail_trie := newTrie1;
        return "Course deleted";

    };

    // 📍  -----------------TEST TAKING FUNCTIONS------------------------ 
    func trackNewCourseTest(keyElement : Text, testId : Text) : async () {
        var testIdList : List.List<Text> = List.nil<Text>();
        let updatedTestIdList = List.push(testId, testIdList);
        let newTrie = Trie.put(testrack_trie, Key.key keyElement, Text.equal, updatedTestIdList).0;
        testrack_trie := newTrie;
    };

    func trackCheckTest(keyElement : Text) : async Bool {
        switch (Trie.get(testrack_trie, Key.key keyElement, Text.equal)) {
            case (?result) {
                true;
            };
            case null {
                false;
            };
        };
    };

    public shared (msg) func testTracking(courseId : Text, testId : Text) : async () {
        if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };

        let keyElement = Principal.toText(msg.caller) # courseId;

        let result = await trackCheckTest(keyElement);
        Debug.print(debug_show (result));

        switch (result) {
            case (true) {
                Debug.print("You have already taken the test");
            };
            case (false) {
                await trackNewCourseTest(keyElement, testId);
            };
        };
    };

    public shared ({caller}) func trackTest(keyElement : Text, testId : Text) : async () {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };

        switch (Trie.get(testrack_trie, Key.key keyElement, Text.equal)) {
            case (?result) {
                let foundTestId = List.find(result, func (x : Text) : Bool {x == testId});
                if (foundTestId != null) {
                    Debug.trap("You have already taken the test");
                } else {
                    let updatedTestIdList = List.push(testId, result);
                    let newTrie = Trie.put(testrack_trie, Key.key keyElement, Text.equal, updatedTestIdList).0;
                    testrack_trie := newTrie;
                };
            };
            case (null) {
                throw Error.reject("Test tracking is not present");
            };
        };
    };
    // 📍📍

    func updateCourse(course : CourseModel.CourseDetail) : async Text {

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

       public shared query (msg) func getfullCourseVideoIds(courseId : Text) : async CourseModel.VideoIds {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        return switch (Trie.get(course_detail_trie, Key.key courseId, Text.equal)) {
            case (?course) { 
                course.videoidlist
             };
            case null {
                throw Error.reject("course is not present");
            };
        };
    };


    public shared (msg) func addCourseLessons(courseId : Text, variant : CourseModel.Varient) : async Text {
        if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };

        let canisterId = Principal.fromActor(Self);
    
        // Check if the caller is one of the controllers
        let controllerResult = await isController(canisterId,msg.caller);
        if (controllerResult == false) {
        return ("Unauthorized: Only controllers can add a course.");
        };

        

        let uniqueId : Text = Uuid.generateUUID();

        switch (variant) {
            case (#Article(input)) {
                let id : Text = "article#" # uniqueId;
                let result1 = await ContentController.addvideoId
                
                (course_detail_trie, courseId, id);

                course_detail_trie := result1;

                let result2=await ArticleController.addarticle(article_trie,id,input);

                article_trie := result2;
                
                return "Article added with ID: " # id;
            };

            case (#Video(input)) {
                
                let id : Text = "video#" # uniqueId;
                
                let result1 = await ContentController.addvideoId
                
                (course_detail_trie, courseId, id);
                
                course_detail_trie := result1;
                
                let result = await VideoController.addvideodetail(video_trie, id, 
                input);
                
                video_trie := result;

                return "Video added with ID: " # id;
            };
            case (#Test(input)) {
                
                let id : Text = "test#" # uniqueId;
                
                let result1 = await ContentController.addvideoId(course_detail_trie, courseId, id);
                
                course_detail_trie := result1;

                let result2=await TestController.addtestId(test_trie,id,input);
                
                test_trie := result2;
                
                return "Test added with ID: " # id;
            };
        };
    };

    public shared (msg) func removeLesson(courseId : Text, lessonId : Text) : async Text {
    // Check if caller is anonymous
    if (Principal.isAnonymous(msg.caller)) {
        Debug.trap("Anonymous caller detected");
    };

    // Verify if the caller is a controller
    let canisterId = Principal.fromActor(Self);
    let controllerResult = await isController(canisterId, msg.caller);

    if (controllerResult == false) {
        return "Unauthorized: Only controllers can remove a lesson.";
    };

    let courseOption = Trie.get(course_detail_trie, Key.key(courseId), Text.equal);
    switch (courseOption) {
        case (?courseDetail) {
            let splitIdArray = Iter.toArray(Text.split(lessonId, #char '#'));
            if (Array.size(splitIdArray) > 1) {
                let lessonType = splitIdArray[0];
                switch (lessonType) {
                    case "article" {
                        let (newTrie, _) = Trie.remove(article_trie, Key.key(lessonId), Text.equal);
                        article_trie := newTrie;
                    };
                    case "video" {
                        let (newTrie, _) = Trie.remove(video_trie, Key.key(lessonId), Text.equal);
                        video_trie := newTrie;
                    };
                    case "test" {
                        let (newTrie, _) = Trie.remove(test_trie, Key.key(lessonId), Text.equal);
                        test_trie := newTrie;
                    };
                    case _ {
                        return "Invalid lesson ID format.";
                    };
                };
            } else {
                return "Invalid lesson ID format.";
            };

            // Filter out the lessonId from the video list in the course details
            let updatedVideoList = List.filter(courseDetail.videoidlist, func(x: Text) : Bool { x != lessonId });
            
            // Create an updated course detail with the modified video list
            let updatedCourseDetail = {
                courseDetail with
                videoidlist = updatedVideoList
            };
            
            // Update the course detail trie with the modified course detail
            let newCourseDetailTrie = await ContentController.updatelongcourse(course_detail_trie, updatedCourseDetail);
            course_detail_trie := newCourseDetailTrie;

            return "Lesson removed successfully.";
        };
        case null {
            throw Error.reject("Course not found.");
        };
    };
};



    public shared query (msg) func getarticle(articleId:Text): async ArticleModel.Article {
        return switch (Trie.get(article_trie, Key.key articleId, Text.equal)) {
            case (?course) { course };
            case null {
                throw Error.reject("course is not present");
            };
        };
    };

    // public shared (msg) func addvideodetail(courseId : Text, video : VideoModel.VideoInput) : async Text {
    //     if (Principal.isAnonymous(msg.caller)) {
    //         Debug.trap("Anonymous caller detected");
    //     };
    //     let videoId : Text = Uuid.generateUUID();
    //     Debug.print(videoId);
    //     let result = await VideoController.addvideodetail(video_trie, videoId, video);
    //     video_trie := result;
    //     let result1 = await ContentController.addvideoId(course_detail_trie, courseId, videoId, video.videoduration);
    //     course_detail_trie := result1;
    //     return "Video details added successfully";
    // };

    public shared query (msg) func getvideodetail(videoId : Text) : async VideoModel.VideoDetail {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        return switch (Trie.get(video_trie, Key.key videoId, Text.equal)) {
            case (?video) { video };
            case null {

                throw Error.reject("video is not present");
            };
        };
    };

    // ============made by Chandan Kushwaha================
    public shared query (msg) func getvideodetailTitile(videoId : Text) : async VideoModel.VideoDetailTitle {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        return switch (Trie.get(video_trie, Key.key videoId, Text.equal)) {
            case (?video) { video.videoTitle };
            case null {

                throw Error.reject("video is not present");
            };
        };
    };
// =========================
    func updatemarks (CourseID : Text ) : async Text {
        let course = await getfullCourse(CourseID);
        let updated_course : CourseModel.CourseDetail = {
                courseId  = course.courseId;
                courseTitle  = course.courseTitle;
                courseImg = course.courseImg;
                shortdescription = course.shortdescription;
                longdescription = course.longdescription;
                videocount = course.videocount;
                videoidlist = course.videoidlist;
                certificateimg = course.certificateimg; 
                duration = course.duration;
                level = course.level;
                viewcount = course.viewcount;
                viewlist = course.viewlist;
                enrollmentcount = course.enrollmentcount;
                enrollmentuserId = course.enrollmentuserId;
                rating = course.rating;
                questions = course.questions;
                learningpoints = course.learningpoints;                
                totaltestmarks = course.totaltestmarks + 1.0;
                totalpassingmarks = (course.totaltestmarks + 1)*0.6;               
                coursetype = course.coursetype;
                professorName = course.professorName;
                professorId = course.professorId;
                upload_date = course.upload_date;
                nftcanisterId = course.nftcanisterId;
        };
        let new_course = await updateCourse(updated_course);
        return new_course;
    };


    public shared (msg) func addquestiontestid(courseId : Text, testId:Text,question:QuestionModel.QuestionInput): async Text{
        if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };
        let canisterId = Principal.fromActor(Self);
    
        // Check if the caller is one of the controllers
        let controllerResult = await isController(canisterId,msg.caller);
    
        if (controllerResult == false) {
        return ("Unauthorized: Only controllers can add a question.");
        };

        let questionId : Text = Uuid.generateUUID();
        // Debug.print(questionId);

        let result1=await TestController.addquestionIdtest(test_trie,questionId,testId);
        test_trie := result1;

        let newQuestionTrie = await QuestionController.addquestion(question_trie, question, questionId);
        question_trie := newQuestionTrie;
        return await updatemarks(courseId);
    };



    public shared query (msg) func getquestionlistbytestid(test_id:Text):async TestModel.Test{
        return switch (Trie.get(test_trie, Key.key test_id, Text.equal)) {
            case (?test) { test };
            case null {

                throw Error.reject("test is not present");
            };
        };
    };

    public shared (msg) func enrollbystudent(courseId : Text) : async Text {
        if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };
        if (courseId == "") {
            return "enter required fields";
        };
        let result = await ContentController.enrollbystudent(course_detail_trie, courseId, msg.caller);
        course_detail_trie := result;
        return "course enrolled";
    };

    public shared (msg) func rating(courseId : Text, rating : Int) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        if (courseId == "" or rating == 0) {
            return "Enter required fields";
        };
        let result = await ContentController.rating(course_detail_trie, courseId, msg.caller, rating);
        course_detail_trie := result;
        return "Rating successful" ;
    };

    public shared (msg) func videoview(courseId : Text) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        let result = await VideoController.viewvideo(video_trie, courseId, msg.caller);
        video_trie := result;
        return "Video viewed";
    };

    public shared (msg) func addquestioncourse(courseId : Text, question : QuestionModel.QuestionInput) : async Text {
        if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };
        let canisterId = Principal.fromActor(Self);
    
        // Check if the caller is one of the controllers
        let controllerResult = await isController(canisterId,msg.caller);
    
        if (controllerResult == false) {
        return ("Unauthorized: Only controllers can add a course.");
        };

        let questionId : Text = Uuid.generateUUID();
        let addQuestionId = await ContentController.addquestionId(course_detail_trie, courseId, questionId);
        course_detail_trie := addQuestionId;
        let newQuestionTrie = await QuestionController.addquestion(question_trie, question, questionId);
        question_trie := newQuestionTrie;
        return "question added";
    };

    public shared query (msg) func getquestion(questionId : Text) : async QuestionModel.Questionsend {
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

    // public shared query (msg) func getrandomquestion(courseId : Text) : async QuestionModel.Question {

    //     // let questionId = await ContentController.getrandomquestionId(course_detail_trie,courseId);

    //     switch (Trie.get(course_detail_trie, Key.key courseId, Text.equal)) {
    //         case (?course) {
    //             let questionsCount : Nat = List.size(course.questions);
    //             if (questionsCount == 0) {
    //                 throw Error.reject("Question is not present");
    //             };
    //             let timestamp = now();
    //             let random_number = timestamp % questionsCount;
    //             let text = Int.toText(random_number);
    //             let natvalue = Nat.fromText(text);
    //             switch (natvalue) {
    //                 case (?nat) {
    //                     let mayQuestionId = List.get<Text>(course.questions, nat);

    //                     switch (mayQuestionId) {
    //                         case (?questionId) {

    //                             switch (Trie.get(question_trie, Key.key questionId, Text.equal)) {
    //                                 case (?question) { return question };
    //                                 case null {

    //                                     throw Error.reject("Question is not present");
    //                                 };
    //                             };
    //                         };
    //                         case null {
    //                             throw Error.reject("Question is not present");
    //                         };
    //                         case null {
    //                             throw Error.reject("Question is not present");
    //                         };
    //                     };

    //                     // return switch (Trie.get(question_trie, Key.key questionId, Text.equal)) {
    //                     //     case (?question) { question };
    //                     //     case null {

    //                     //         throw Error.reject("Question is not present");
    //                     //     };
    //                     // };

    //                 };
    //             };
    //         };
    //         case null {
    //             throw Error.reject("course is not present");
    //         };

    //     };
    // };

    public shared query (msg) func isuserenrolled(courseId : Text) : async Bool {

        if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };
        switch (Trie.get(course_detail_trie, Key.key courseId, Text.equal)) {
            case (?course) {
                func change(x : Principal) : Bool {
                    x == msg.caller;
                };

                let foundUserid = List.find(course.enrollmentuserId, change);

                if (foundUserid != null) {
                    return true;
                } else {
                    return false;
                };
            };
            case null {
                throw Error.reject("course is not present");
            };
        };

    };

    func getquestioncheck(questionId : Text) : async QuestionModel.Question {

        return switch (Trie.get(question_trie, Key.key questionId, Text.equal)) {
            case (?question) { question };
            case null {

                throw Error.reject("Question is not present");
            };
        };
    };

    public shared (msg) func calculateresults(courseId : Text, questionanswer : [Text]) : async Nat {
        if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };
        var totalMarks = 0;

        for (item in questionanswer.vals()) {
            let partsIter = Text.split(item, #char ',');
            let parts = Iter.toArray(partsIter);

            Debug.print(debug_show (parts));
            Debug.print(debug_show (parts[0]));
            Debug.print(debug_show (parts[1]));

            let question = await getquestioncheck(parts[0]);
            Debug.print(debug_show (question));
            if (question.correctanswer == parts[1]) {
                totalMarks := totalMarks +1;
            };

        };

        let keyelement = Principal.toText(msg.caller) # courseId;
        Debug.print(debug_show (keyelement));

        let newTrie = Trie.put(result_trie, Key.key(keyelement), Text.equal, totalMarks).0;
        
        result_trie := newTrie;

        return totalMarks;
    };

    public shared (msg) func getresult(courseId : Text) : async Nat {
        if (Principal.isAnonymous(msg.caller)) {
            Debug.trap("Anonymous caller detected");
        };
        let keyelement = Principal.toText(msg.caller) # courseId;
        Debug.print(debug_show (keyelement));
        switch (Trie.get(result_trie, Key.key (keyelement), Text.equal)) {
            case (?result) { result };
            case null {
                throw Error.reject("result is not present");
            };
        };
    };

    public shared (msg) func videotracking(courseId : Text, videoId : Text) : async () {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };

        let keyElement = Principal.toText(msg.caller) # courseId;

        Debug.print(debug_show (keyElement));

        let result = await trackcheck(keyElement);
        Debug.print(debug_show (result));

        switch (result) {
            case (true) {
                await trackVideo(keyElement, videoId);
            };
            case (false) {
                await tracknewcoursevideo(keyElement, videoId);
            };
        };
    };

    func tracknewcoursevideo(keyElement : Text, videoId : Text) : async () {
        // let videoList = [videoId];
        var videoidlist : List.List<Text> = List.nil<Text>();
        let updatedvideoList = List.push(videoId, videoidlist);
        let newTrie = Trie.put(coursetrack_trie, Key.key keyElement, Text.equal, updatedvideoList).0;
        coursetrack_trie := newTrie;
    };


    func trackcheck(keyElement : Text) : async Bool {
        switch (Trie.get(coursetrack_trie, Key.key keyElement, Text.equal)) {
            case (?result) {
                true;
            };
            case null {
                false;
            };
        };
    };

    func trackVideo(keyElement : Text, videoId : Text) : async () {
        func change(x : Text) : Bool {
            x == videoId;
        };
        switch (Trie.get(coursetrack_trie, Key.key keyElement, Text.equal)) {
            case (?result) {
                let foundvideoid = List.find(result, change);
                if (foundvideoid != null) {
                    Debug.print("You have already watched the video");
                } else {
                    let updatedvideoList = List.push(videoId, result);
                    Debug.print(debug_show (result));
                    Debug.print(debug_show (updatedvideoList));
                    let newTrie = Trie.put(coursetrack_trie, Key.key keyElement, Text.equal, updatedvideoList).0;
                    coursetrack_trie := newTrie;
                };
            };
            case (null) {
                throw Error.reject("tracking is not present");
            };
        };
    };

    public shared query (msg) func getwatchedvideo(courseId : Text) : async List.List<Text> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        let keyElement = Principal.toText(msg.caller) # courseId;
        Debug.print(debug_show (keyElement));
        switch (Trie.get(coursetrack_trie, Key.key keyElement, Text.equal)) {
            case (?result) {
                result;
            };
            case (null) {
                throw Error.reject("tracking is not present");
            };
        };
    };

    public shared (msg) func allvideowatched1(courseId : Text) : async Bool {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        let keyElement = Principal.toText(msg.caller) # courseId;

        let courseVideos = Trie.get(course_detail_trie, Key.key(courseId), Text.equal);
        switch (courseVideos) {
            case (?courseVideos) {
                let idlist = courseVideos.videoidlist;
                let watchedVideos = Trie.get(coursetrack_trie, Key.key(keyElement), Text.equal);
                switch (watchedVideos) {
                    case (?watchedVideos) {
                        if (List.size(watchedVideos) == List.size(idlist)) {

                            return true;
                        } else {
                            return false;
                        };
                    };
                    case (null) {
                        throw Error.reject("tracking is not present");
                    };
                };
            };
            case (null) {
                throw Error.reject("tracking is not present");

            };
        };
    };

    public shared (msg) func allvideowatched2(courseId : Text, blob : Text) : async Text {
        // if (Principal.isAnonymous(msg.caller)) {
        //     Debug.trap("Anonymous caller detected");
        // };
        let keyElement = Principal.toText(msg.caller) # courseId;

        let courseVideos = Trie.get(course_detail_trie, Key.key(courseId), Text.equal);
        switch (courseVideos) {
            case (?courseVideos) {
                let idlist = courseVideos.videoidlist;
                let watchedVideos = Trie.get(coursetrack_trie, Key.key(keyElement), Text.equal);
                Debug.print(debug_show ("videowatched"));
                switch (watchedVideos) {
                    case (?watchedVideos) {
                        let watchedsize = List.size(watchedVideos);
                        Debug.print(debug_show ("1", watchedsize));
                        let idlistsize = List.size(idlist);
                        Debug.print(debug_show ("2", idlistsize));
                        Debug.print(debug_show (watchedVideos));
                        Debug.print(debug_show ("3", idlist));

                        if (List.size(watchedVideos) == List.size(idlist)) {
                            Debug.print(debug_show ("sizeequal"));
                            let sortedList1 = Array.sort(List.toArray(watchedVideos), Text.compare);
                            let sortedList2 = Array.sort(List.toArray(idlist), Text.compare);

                            let areEqual = Array.equal(sortedList1, sortedList2, Text.equal);
                            // let equallist = List.compare<Text>(watchedVideos, idlist, Text.equal);
                            Debug.print(debug_show ("equallist1", areEqual));

                            if (areEqual) {
                                Debug.print(debug_show ("equallist", areEqual));
                                let userId = msg.caller;
                                let metadata : nftModel.MetadataDesc = [{
                                    data = "1";
                                    key_val_data = [{ key = "courseId"; val = #TextContent(courseVideos.courseId) }, { key = "courseTitle"; val = #TextContent(courseVideos.courseTitle) }, { key = "course description"; val = #TextContent(courseVideos.shortdescription) }, { key = "certificate"; val = #TextContent(blob) }];
                                    purpose = #Rendered;
                                }];
                                let result = await mintnft(userId : Principal, courseId : Text, metadata : nftModel.MetadataDesc);
                                Debug.print(debug_show ("mintnftafter"));
                                return "nft minted successfully";

                            } else {
                                return "you have not watched all the videos ";
                            };
                        } else {
                            return "you have not watched all the videos ";
                        };
                    };
                    case (null) {
                        throw Error.reject("tracking is not present");

                    };

                };
            };

            case (null) {
                throw Error.reject("tracking is not present");

            };
        };
    };

    func mintnft(userId : Principal, courseId : Text, metadata : nftModel.MetadataDesc) : async nftModel.MintReceipt {
        Debug.print(debug_show (metadata));
        switch (Trie.get(course_trie, Key.key courseId, Text.equal)) {
            case (?course) {
                Debug.print(debug_show (course.nftcanisterId));
                let tokenActor = actor (course.nftcanisterId) : ActorModel.Self;

                let result = await tokenActor.mintDip721(userId, metadata);

                Debug.print(debug_show ("hhh", result));

                return result;
            };
            case null {

                throw Error.reject("course is not present");
            };

        };
    };

    // public shared (msg) func mintingnft(courseId : Text, blob : Text) : async nftModel.MintReceipt {
    //     switch (Trie.get(course_trie, Key.key courseId, Text.equal)) {
    //         case (?course) {

    //             Debug.print(debug_show (course.nftcanisterId));
    //             let tokenActor = actor (course.nftcanisterId) : ActorModel.Self;
    //             let metadata1 : nftModel.MetadataDesc = [{
    //                 data = "1";
    //                 key_val_data = [{ key = "courseId"; val = #TextContent(course.courseId) }, { key = "courseTitle"; val = #TextContent(course.courseTitle) }, { key = "course description"; val = #TextContent(course.shortdescription) }, { key = "certificate"; val = #TextContent(blob) }];
    //                 purpose = #Rendered;
    //             }];

    //             let result = await tokenActor.mintDip721(msg.caller, metadata1);

    //             Debug.print(debug_show ("hhh", result));

    //             return result;
    //         };
    //         case null {

    //             throw Error.reject("course is not present");
    //         };

    //     };
    // };

    public shared (msg) func getcertificate(courseId : Text) : async nftModel.MetadataResult {
        switch (Trie.get(course_trie, Key.key courseId, Text.equal)) {
            case (?course) {
                Debug.print(debug_show (course.nftcanisterId));
                let tokenActor = actor (course.nftcanisterId) : ActorModel.Self;

                let result = await tokenActor.getTokenIdsForUserDip721(msg.caller);
                let result1 = await tokenActor.getMetadataDip721(result[0]);

                Debug.print(debug_show ("hhh", result));
                Debug.print(debug_show ("hhh", result1));

                return result1;
            };
            case null {
                throw Error.reject("course is not present");
            };

        };
    };

    public shared ({caller}) func get_stats_educator(courseId : Text) : async {students  : [Principal] ;total_students : Nat;  
    certificates : [ActorModel.Nft];total_certificates : Nat64} {
        let course = await getfullCourse(courseId);
        let total_students = List.size(course.enrollmentuserId);
        let nftcanisterId = course.nftcanisterId;

        let tokenActor = actor (nftcanisterId) : ActorModel.Self;

        let result = await tokenActor.totalSupplyDip721();
        let total_certificates = result;

        let Certificates_data = await tokenActor.getallNft();

        return { students = List.toArray(course.enrollmentuserId) ; total_students = total_students;certificates = Certificates_data; total_certificates = total_certificates};
    }; 
        

    // public query func check_cycle_balance() : async Nat {
    //     let balance = Cycles.balance();
    //     Debug.print("Balance: " # debug_show (balance));
    //     return balance;
    // };

    //   j3dqa-byaaa-aaaah-qcwfa-cai

};
