import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import List "mo:base/List";
import Trie "mo:base/Trie";

module {
    public type QuestionInput = {
        question : Text;
        option1 : Text;
        option2 : Text;
        option3 : Text;
        option4 : Text;
        correctanswer : Text;
    };

    public type Question = {
        questionId : Text;
        question : Text;
        option1 : Text;
        option2 : Text;
        option3 : Text;
        option4 : Text;
        correctanswer : Text;
    };

    public type Trie<K, V> = Trie.Trie<K, V>;

    public type Key<K> = Trie.Key<K>;
};
