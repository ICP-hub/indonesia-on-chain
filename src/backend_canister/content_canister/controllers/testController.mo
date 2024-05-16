import TestModel "../models/testModel";
import HashMap "mo:base/HashMap";
import Error "mo:base/Error";
import Text "mo:base/Text";
import Uuid "../utility/uuid";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Trie "mo:base/Trie";
import Key "../utility/key";

module {

    public func addtestId(test_trie : Trie.Trie<Text, TestModel.Test>, testId : Text, test : TestModel.TestInput) : async Trie.Trie<Text, TestModel.Test> {

        var questionId : List.List<Text> = List.nil<Text>();
        let newtest : TestModel.Test = {
            testId = testId;
            testTitle = test.testTitle;
            coursename = test.coursename;
            questionlist = questionId;
        };

        let newTrie = Trie.put(test_trie, Key.key(testId), Text.equal, newtest).0;
        return newTrie;
    };

    public func addquestionIdtest(test_trie : Trie.Trie<Text, TestModel.Test>, questionId : Text, testId : Text) : async Trie.Trie<Text, TestModel.Test> {
        return switch (Trie.get(test_trie, Key.key testId, Text.equal)) {
            case (?test) {

                // test
                 let updatedquestionlist = List.push(questionId, test.questionlist);


                let newtest : TestModel.Test = {
                    testId = test.testId;
                    testTitle = test.testTitle;
                    coursename = test.coursename;
                    questionlist = updatedquestionlist;
                };
                let newTrie = Trie.put(test_trie, Key.key(testId), Text.equal, newtest).0;
                return newTrie;

            };
            case null {

                throw Error.reject("test is not present");
            };
        };
    };

};
