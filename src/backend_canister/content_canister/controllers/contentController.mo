import CourseModel "../models/courseModel";
import HashMap "mo:base/HashMap";
import Error "mo:base/Error";
import Text "mo:base/Text";
import Uuid "../utility/uuid";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Principal "mo:base/Principal";
import CourseValidator "../validations/courseValidation";
import { now } "mo:base/Time";
import Trie "mo:base/Trie";
import Key "../utility/key";
import Random "mo:base/Random";
import Nat "mo:base/Nat";
import Int "mo:base/Int";

module {

  public func addshortcourse(course_trie : Trie.Trie<Text, CourseModel.Course>, uniqueId : Text, course : CourseModel.Coursedetailinput) : async Trie.Trie<Text, CourseModel.Course> {
    // let uniqueId : Text = Uuid.generateUUID();
    // Debug.print(uniqueId);
    let courseInfo : CourseModel.Course = {
      courseId = uniqueId;
      courseTitle = course.courseTitle;
      courseImg = course.courseImg;
      professorName = course.professorName;
      professorId = course.professorId;
      upload_date = now();
    };
    let newTrie = Trie.put(course_trie, Key.key(courseInfo.courseId), Text.equal, courseInfo).0;

    return newTrie;
  };

  public func addCoursedetail(course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail>, uniqueId : Text, course : CourseModel.Coursedetailinput) : async Trie.Trie<Text, CourseModel.CourseDetail> {
    // let uniqueId : Text = Uuid.generateUUID();
    Debug.print(uniqueId);

    var viewlist : List.List<Text> = List.nil<Text>();

    var videoidlist : List.List<Text> = List.nil<Text>();

    var enrollmentuserId : List.List<Principal> = List.nil<Principal>();

    let courseInfo : CourseModel.CourseDetail = {
      courseId = uniqueId;
      courseTitle = course.courseTitle;
      courseImg = course.courseImg;
      shortdescription = course.shortdescription;
      longdescription = course.longdescription;
      videocount = 0;
      videoidlist = videoidlist;
      certificateimg = course.certificateimg;
      duration = 0;
      level = course.level;
      viewcount = course.viewcount;
      viewlist = viewlist;
      enrollmentcount = 0;
      enrollmentuserId = enrollmentuserId;
      rating = course.rating;
      learningpoints = course.learningpoints;
      questions = course.questions;
      coursetype = course.coursetype;
      professorName = course.professorName;
      professorId = course.professorId;
      upload_date = now();
    };
    let newTrie = Trie.put(course_detail_trie, Key.key(courseInfo.courseId), Text.equal, courseInfo).0;
    // course_detail_trie := newTrie;
    // course_detail_map.put(uniqueId, courseInfo);
    return newTrie;

  };

  public func getCourse(course_map : HashMap.HashMap<Text, CourseModel.Course>, courseId : Text) : async CourseModel.Course {
    return switch (course_map.get(courseId)) {
      case (?course) { course };
      case null {

        throw Error.reject("course is not present");
      };
    };
  };

  public func updateshortcourse(course_trie : Trie.Trie<Text, CourseModel.Course>, updatedCourse : CourseModel.CourseDetail) : async Trie.Trie<Text, CourseModel.Course> {

    switch (Trie.get(course_trie, Key.key(updatedCourse.courseId), Text.equal)) {
      case (?course) {
        let courseInfo : CourseModel.Course = {
          courseId = updatedCourse.courseId;
          courseTitle = updatedCourse.courseTitle;
          courseImg = updatedCourse.courseImg;
          professorName = updatedCourse.professorName;
          professorId = updatedCourse.professorId;
          upload_date = updatedCourse.upload_date;
        };
        let newTrie = Trie.put(course_trie, Key.key(courseInfo.courseId), Text.equal, courseInfo).0;

        return newTrie;
      };
      case null {

        Debug.trap("Course not found");
      };
    };

  };

  public func updatelongcourse(course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail>, updatedCourse : CourseModel.CourseDetail) : async Trie.Trie<Text, CourseModel.CourseDetail> {
    switch (Trie.get(course_detail_trie, Key.key(updatedCourse.courseId), Text.equal)) {
      case (?course) {
        let courseInfo : CourseModel.CourseDetail = {
          courseId = updatedCourse.courseId;
          courseTitle = updatedCourse.courseTitle;
          courseImg = updatedCourse.courseImg;
          shortdescription = updatedCourse.shortdescription;
          longdescription = updatedCourse.longdescription;
          videocount = updatedCourse.videocount;
          videoidlist = updatedCourse.videoidlist;
          certificateimg = updatedCourse.certificateimg;
          duration = updatedCourse.duration;
          level = updatedCourse.level;
          viewcount = updatedCourse.viewcount;
          viewlist = updatedCourse.viewlist;
          enrollmentcount = updatedCourse.enrollmentcount;
          enrollmentuserId = updatedCourse.enrollmentuserId;
          rating = updatedCourse.rating;
          learningpoints = updatedCourse.learningpoints;
          questions = updatedCourse.questions;
          coursetype = updatedCourse.coursetype;
          professorName = updatedCourse.professorName;
          professorId = updatedCourse.professorId;
          upload_date = updatedCourse.upload_date;
        };
        let newTrie = Trie.put(course_detail_trie, Key.key(courseInfo.courseId), Text.equal, courseInfo).0;
        // course_detail_trie := newTrie;
        // course_detail_map.put(uniqueId, courseInfo);
        return newTrie;
      };
      case null {

        Debug.trap("Course not found");
      };
    };

  };

  public func deleteCourse(course_detail_map : HashMap.HashMap<Text, CourseModel.CourseDetail>, course_map : HashMap.HashMap<Text, CourseModel.Course>, courseId : Text) : async Text {

    switch (course_map.get(courseId)) {
      case (?course) {
        course_map.delete(courseId);
        course_detail_map.delete(courseId);
        return "Course deleted successfully";
      };

      case null {
        throw Error.reject("course is not present");
      };
    };

  };

  func getfullCourse(course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail>, courseId : Text) : async CourseModel.CourseDetail {
    return switch (Trie.get(course_detail_trie, Key.key courseId, Text.equal)) {
      case (?course) { course };
      case null {
        throw Error.reject("course is not present");
      };
    };
  };

  public func addvideoId(course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail>, courseId : Text, videoId : Text, videoduration : Int) : async Trie.Trie<Text, CourseModel.CourseDetail> {

    let course : CourseModel.CourseDetail = await getfullCourse(course_detail_trie, courseId);

    let updateddvideoCount = course.videocount + 1;

    let updatedvideolist = List.push(videoId, course.videoidlist);

    let updateddvideoduration = course.duration + videoduration;

    let updatedcourse : CourseModel.CourseDetail = {
      courseId = course.courseId;
      courseTitle = course.courseTitle;
      courseImg = course.courseImg;
      shortdescription = course.shortdescription;
      longdescription = course.longdescription;
      videocount = updateddvideoCount;
      videoidlist = updatedvideolist;
      certificateimg = course.certificateimg;
      duration = updateddvideoduration;
      level = course.level;
      viewcount = course.viewcount;
      viewlist = course.viewlist;
      enrollmentcount = course.enrollmentcount;
      enrollmentuserId = course.enrollmentuserId;
      rating = course.rating;
      learningpoints = course.learningpoints;
      questions = course.questions;
      coursetype = course.coursetype;
      professorName = course.professorName;
      professorId = course.professorId;
      upload_date = course.upload_date;
    };
    await updatelongcourse(course_detail_trie, updatedcourse)

  };

  public func enrollbystudent(course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail>, courseId : Text, studentId : Principal) : async Trie.Trie<Text, CourseModel.CourseDetail> {
    let course : CourseModel.CourseDetail = await getfullCourse(course_detail_trie, courseId);

    func change(x : Principal) : Bool {
      x == studentId;
    };

    let foundUserid = List.find(course.enrollmentuserId, change);

    if (foundUserid != null) {
      Debug.trap("You have already enroll the course");
    } else {

      let updatedenrollmentcount = course.enrollmentcount + 1;

      let updatedenrollmentlist = List.push(studentId, course.enrollmentuserId);

      let updatedcourse : CourseModel.CourseDetail = {
        courseId = course.courseId;
        courseTitle = course.courseTitle;
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
        enrollmentcount = updatedenrollmentcount;
        enrollmentuserId = updatedenrollmentlist;
        rating = course.rating;
        learningpoints = course.learningpoints;
        questions = course.questions;
        coursetype = course.coursetype;
        professorName = course.professorName;
        professorId = course.professorId;
        upload_date = course.upload_date;
      };
      await updatelongcourse(course_detail_trie, updatedcourse)

    };

  };

  public func rating(course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail>, courseId : Text, studentId : Principal, rating : Int) : async Trie.Trie<Text, CourseModel.CourseDetail> {

    let course : CourseModel.CourseDetail = await getfullCourse(course_detail_trie, courseId);

    func change(x : Principal) : Bool {
      x == studentId;
    };

    let foundUserid = List.find(course.enrollmentuserId, change);

    if (foundUserid != null) {
      let updatedrating = (course.rating + rating) / course.enrollmentcount;

      let updatedcourse : CourseModel.CourseDetail = {
        courseId = course.courseId;
        courseTitle = course.courseTitle;
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
        rating = updatedrating;
        learningpoints = course.learningpoints;
        questions = course.questions;
        coursetype = course.coursetype;
        professorName = course.professorName;
        professorId = course.professorId;
        upload_date = course.upload_date;
      };
      await updatelongcourse(course_detail_trie, updatedcourse)

    } else {
      Debug.trap("first enroll in the course");

    };

  };

  public func addquestionId(course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail>, courseId : Text, questionId : Text) : async Trie.Trie<Text, CourseModel.CourseDetail> {
    let course : CourseModel.CourseDetail = await getfullCourse(course_detail_trie, courseId);

    let updatedquestionlist = List.push(questionId, course.questions);

    let updatedcourse : CourseModel.CourseDetail = {
      courseId = course.courseId;
      courseTitle = course.courseTitle;
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
      learningpoints = course.learningpoints;
      questions = updatedquestionlist;
      coursetype = course.coursetype;
      professorName = course.professorName;
      professorId = course.professorId;
      upload_date = course.upload_date;
    };
    await updatelongcourse(course_detail_trie, updatedcourse)

  };

  public func getrandomquestionId(course_detail_trie : CourseModel.Trie<Text, CourseModel.CourseDetail>, courseId : Text) : async Text {
    let course : CourseModel.CourseDetail = await getfullCourse(course_detail_trie, courseId);
    let questionsCount : Nat = List.size(course.questions);
    if (questionsCount == 0) {
      return "";
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
            return questionId;
          };
          case null {
            return "not available";
          };
        };
      };
      case null {
        return "hhh";
      }
    };
    // let natValue : Nat = Int(NatN.fromNat(IntN.toInt(random_number).abs()));

  };

};
