import ArticleModel "../models/articleModel";
import HashMap "mo:base/HashMap";
import Error "mo:base/Error";
import Text "mo:base/Text";
import Uuid "../utility/uuid";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Trie "mo:base/Trie";
import Key "../utility/key";

module {

    public func addarticle(article_trie : Trie.Trie<Text, ArticleModel.Article>, articleId : Text, article : ArticleModel.ArticleInput) : async Trie.Trie<Text, ArticleModel.Article> {

        var viewuserId : List.List<Principal> = List.nil<Principal>();


        let newarticle : ArticleModel.Article = {
            articleId =articleId;
            articleTitle = article.articleTitle;
            articleImg = article.articleImg;
            description = article.description;
            viewcount =0;
            viewlist = viewuserId;
        };
        let newTrie=Trie.put(article_trie, Key.key(articleId), Text.equal, newarticle).0;
        return newTrie;
    };
};

