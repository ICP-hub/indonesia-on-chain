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
import QuestionModel "../models/questionModel";

module {
    public func addquestion(question_Trie : Trie.Trie<Text, QuestionModel.Question>, question : QuestionModel.QuestionInput, questionId : Text) : async Trie.Trie<Text, QuestionModel.Question> {
        let questionInfo : QuestionModel.Question = {
            questionId =questionId;
            question =question.question;
            option1 =question.option1;
            option2 =question.option2;
            option3 =question.option3;
            option4 =question.option4;
            correctanswer= question.correctanswer;
        };
        let newTrie = Trie.put(question_Trie, Key.key(questionId), Text.equal, questionInfo).0;

        return newTrie;
    };
};
