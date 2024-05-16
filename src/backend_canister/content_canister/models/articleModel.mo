import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import List "mo:base/List";
import Trie "mo:base/Trie";

module {

    public type ArticleInput = {
        articleTitle : Text;
        articleImg : Text;
        description : Text;
    };


    public type Article={
        articleId:Text;
        articleTitle:Text;
        articleImg:Text;
        description:Text;
        viewcount:Int;
        viewlist:List.List<Principal>;
    };

};
