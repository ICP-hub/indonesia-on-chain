import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import List "mo:base/List";

module{

    public type VideoInput ={
        videoTitle:Text;
        videobucket:Text;
        videofile:Text;
        videodescription:Text;
        videoduration:Int;
        viewcount:Int;
    };

    public type VideoDetail={
        videoId:Text;
        videoTitle:Text;
        videobucket:Text;
        videofile:Text;
        videoduration:Int;
        videodescription:Text;
        viewcount:Int;
        viewUserId:List.List<Principal>;
    }

}