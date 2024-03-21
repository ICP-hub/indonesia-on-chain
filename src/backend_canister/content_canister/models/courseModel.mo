
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import List "mo:base/List";
import Trie "mo:base/Trie";

module {


  public type Coursedetailinput = {
    courseTitle : Text;
    courseImg:Text;
    shortdescription:Text;
    longdescription:Text;
    videocount:Int;
    videoidlist:List.List<Text>;
    certificateimg:Text;
    duration:Int;
    level:Text;
    viewcount:Int;
    viewlist:List.List<Text>;
    enrollmentcount:Int;
    enrollmentuserId:List.List<Principal>;
    rating:Int;
    learningpoints:List.List<Text>;
    questions:List.List<Text>;
    coursetype:Text;
    professorName : Text;
    professorId : Text;
  };

  public type Course = {
    courseId : Text; 
    courseTitle : Text;
    courseImg:Text;
    professorName : Text;
    professorId : Text;
    upload_date : Int;   
  };
  
  public type Courseinput = { 
    courseTitle : Text;
    courseImg:Text;
    professorName : Text;
    professorId : Text;
    upload_date : Int;   
  };


  public type CourseDetail={
    courseId : Text; 
    courseTitle : Text;
    courseImg:Text;
    shortdescription:Text;
    longdescription:Text;
    videocount:Int;
    videoidlist:List.List<Text>;
    certificateimg:Text;
    duration:Int;
    level:Text;
    viewcount:Int;
    viewlist:List.List<Text>;
    enrollmentcount:Int;
    enrollmentuserId:List.List<Principal>;
    rating:Int;
    learningpoints:List.List<Text>;
    questions:List.List<Text>;
    coursetype:Text;
    professorName : Text;
    professorId : Text;
    upload_date : Int;
  };


  public type Trie<K, V> = Trie.Trie<K, V>;

  
  public type Key<K> = Trie.Key<K>;
};