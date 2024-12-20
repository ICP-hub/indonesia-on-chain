import Text "mo:base/Text";
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

    public type Questionsend={
        questionId : Text;
        question : Text;
        option1 : Text;
        option2 : Text;
        option3 : Text;
        option4 : Text;
    };

    public type Trie<K, V> = Trie.Trie<K, V>;

    public type Key<K> = Trie.Key<K>;
};
