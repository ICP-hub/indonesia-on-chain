import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import List "mo:base/List";
import Trie "mo:base/Trie";


module {
    public type TestInput = {
        testTitle : Text;
        coursename : Text;
    };


    public type Test={
        testId:Text;
        testTitle : Text;
        coursename : Text;
        questionlist : List.List<Text>;
    }

}