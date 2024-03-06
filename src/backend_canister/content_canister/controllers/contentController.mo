import CourseModel "../models/courseModel";
import HashMap "mo:base/HashMap";
import Error "mo:base/Error";
import Text "mo:base/Text";
import Uuid "../utility/uuid";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Principal "mo:base/Principal";
import CourseValidator "../validations/courseValidation"

module {
  public func addCourse(course_detail_map : HashMap.HashMap<Text, CourseModel.CourseDetail>, course_map : HashMap.HashMap<Text, CourseModel.Course>, course : CourseModel.Coursedetailinput) : async Text {

    if (CourseValidator.coursedetailInputvalidation(course) == false) {
      return "Enter required fields";
    };

    let uniqueId : Text = Uuid.generateUUID();
    let result = await addshortcourse(course_map, uniqueId, course);
    let resultdetail = await addCoursedetail(course_detail_map, uniqueId, course);

    return resultdetail;
  };

  func addshortcourse(course_map : HashMap.HashMap<Text, CourseModel.Course>, uniqueId : Text, course : CourseModel.Coursedetailinput) : async Text {
    // let uniqueId : Text = Uuid.generateUUID();
    // Debug.print(uniqueId);
    let courseInfo : CourseModel.Course = {
      courseId = uniqueId;
      courseTitle = course.courseTitle;
      courseImg = course.courseImg;
      professorName = course.professorName;
      professorId = course.professorId;
      upload_date = course.upload_date;
    };
    course_map.put(uniqueId, courseInfo);
    return "course added successfully";
  };

  func addCoursedetail(course_detail_map : HashMap.HashMap<Text, CourseModel.CourseDetail>, uniqueId : Text, course : CourseModel.Coursedetailinput) : async Text {
    // let uniqueId : Text = Uuid.generateUUID();
    Debug.print(uniqueId);

    var viewlist : List.List<Text> = List.nil<Text>();

    var videoidlist : List.List<Text> = List.nil<Text>();

    var enrollmentuserId : List.List<Principal> = List.nil<Principal>();

    var learningpoints : List.List<Text> = List.nil<Text>();

    var faq : List.List<Text> = List.nil<Text>();

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
      learningpoints = learningpoints;
      faq = faq;
      coursetype = course.coursetype;
      professorName = course.professorName;
      professorId = course.professorId;
      upload_date = course.upload_date;
    };
    course_detail_map.put(uniqueId, courseInfo);
    return "course added successfully";

  };

  public func getCourse(course_map : HashMap.HashMap<Text, CourseModel.Course>, courseId : Text) : async CourseModel.Course {
    return switch (course_map.get(courseId)) {
      case (?course) { course };
      case null {

        throw Error.reject("course is not present");
      };
    };
  };

  public func updateCourse(course_detail_map : HashMap.HashMap<Text, CourseModel.CourseDetail>, course_map : HashMap.HashMap<Text, CourseModel.Course>, updatedCourse : CourseModel.CourseDetail) : async Text {
    if (CourseValidator.coursedetailInputvalidation(updatedCourse) == false) {
      return "Enter required fields";
    };
    let result = await updateshortcourse(course_map, updatedCourse);
    let resultdetail = await updatelongcourse(course_detail_map, updatedCourse);
    return resultdetail;

  };

  func updateshortcourse(course_map : HashMap.HashMap<Text, CourseModel.Course>, updatedCourse : CourseModel.CourseDetail) : async Text {

    switch (course_map.get(updatedCourse.courseId)) {
      case (?course) {
        let courseInfo : CourseModel.Course = {
          courseId = updatedCourse.courseId;
          courseTitle = updatedCourse.courseTitle;
          courseImg = updatedCourse.courseImg;
          professorName = updatedCourse.professorName;
          professorId = updatedCourse.professorId;
          upload_date = updatedCourse.upload_date;
        };
        course_map.put(updatedCourse.courseId, courseInfo);
        return "Course updated successfully";
      };
      case null {

        return "Course not found";
      };
    };

  };

  func updatelongcourse(course_detail_map : HashMap.HashMap<Text, CourseModel.CourseDetail>, updatedCourse : CourseModel.CourseDetail) : async Text {
    switch (course_detail_map.get(updatedCourse.courseId)) {
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
          faq = updatedCourse.faq;
          coursetype = updatedCourse.coursetype;
          professorName = updatedCourse.professorName;
          professorId = updatedCourse.professorId;
          upload_date = updatedCourse.upload_date;
        };
        course_detail_map.put(updatedCourse.courseId, courseInfo);
        return "Course updated successfully";
      };
      case null {

        return "Course not found";
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

  func getfullCourse(course_detail_map : HashMap.HashMap<Text, CourseModel.CourseDetail>, courseId : Text) : async CourseModel.CourseDetail {
    return switch (course_detail_map.get(courseId)) {
      case (?course) { course };
      case null {
        throw Error.reject("course is not present");
      };
    };
  };

  public func addvideoId(course_detail_map : HashMap.HashMap<Text, CourseModel.CourseDetail>, courseId : Text, videoId : Text, videoduration : Int) : async Text {
    if(courseId=="" or videoId=="" or videoduration==0){
      return "Enter required fields";
    };

    let course : CourseModel.CourseDetail = await getfullCourse(course_detail_map, courseId);

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
      faq = course.faq;
      coursetype = course.coursetype;
      professorName = course.professorName;
      professorId = course.professorId;
      upload_date = course.upload_date;
    };
    await updatelongcourse(course_detail_map, updatedcourse)

  };

  public func enrollbystudent(course_detail_map : HashMap.HashMap<Text, CourseModel.CourseDetail>, courseId : Text, studentId : Principal) : async Text {
    if(courseId==""){
      return "enter required fields";
    };
    let course : CourseModel.CourseDetail = await getfullCourse(course_detail_map, courseId);

    func change(x : Principal) : Bool {
      x == studentId;
    };

    let foundUserid = List.find(course.enrollmentuserId, change);

    if (foundUserid != null) {
      return "You have already enroll the course";
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
        faq = course.faq;
        coursetype = course.coursetype;
        professorName = course.professorName;
        professorId = course.professorId;
        upload_date = course.upload_date;
      };
      await updatelongcourse(course_detail_map, updatedcourse)

    };

  };

  public func rating(course_detail_map : HashMap.HashMap<Text, CourseModel.CourseDetail>, courseId : Text, studentId : Principal, rating : Int) : async Text {

    if(courseId=="" or rating==0){
      return "Enter required fields";
    };

    let course : CourseModel.CourseDetail = await getfullCourse(course_detail_map, courseId);

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
        faq = course.faq;
        coursetype = course.coursetype;
        professorName = course.professorName;
        professorId = course.professorId;
        upload_date = course.upload_date;
      };
      await updatelongcourse(course_detail_map, updatedcourse)

    } else {
      return "first enroll in the course";

    };

  };

};
