
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import List "mo:base/List";
import CourseModel "../models/courseModel";


module {
  public func coursedetailInputvalidation(course : CourseModel.Coursedetailinput) : Bool {
    if (
        course.courseTitle == "" or
        course.courseImg == "" or
        course.shortdescription == "" or
        course.longdescription == "" or
        course.certificateimg == "" or 
        course.level == "" or
        course.coursetype == "" or
        course.professorName == "" or
        course.professorId == ""
    ) {
        return false;
    } else {
        return true;
    }
};

public func coursedetailvalidation(course : CourseModel.CourseDetail) : Bool {
    if (
        course.courseTitle == "" or
        course.courseImg == "" or
        course.shortdescription == "" or
        course.longdescription == "" or
        course.certificateimg == "" or 
        course.level == "" or
        course.coursetype == "" or
        course.professorName == "" or
        course.professorId == ""
    ) {
        return false;
    } else {
        return true;
    }
};


     
};
