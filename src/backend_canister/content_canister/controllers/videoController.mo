
import VideoModel "../models/videoModel";
import HashMap "mo:base/HashMap";
import Error "mo:base/Error";
import Text "mo:base/Text";
import Uuid "../utility/uuid";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Trie "mo:base/Trie";
import Key "../utility/key";

module {

    public func addvideodetail(video_trie : Trie.Trie<Text, VideoModel.VideoDetail>, videoId : Text, video : VideoModel.VideoInput) : async Trie.Trie<Text, VideoModel.VideoDetail> {

        var viewuserId : List.List<Principal> = List.nil<Principal>();

        let videoInfo : VideoModel.VideoDetail = {
            videoId = videoId;
            videoTitle = video.videoTitle;
            videobucket = video.videobucket;
            videofile = video.videofile;
            videodescription = video.videodescription;
            videoduration = video.videoduration;
            viewcount = 0;
            viewUserId = viewuserId;
        };
        let newTrie = Trie.put(video_trie, Key.key(videoInfo.videoId), Text.equal, videoInfo).0;

        return newTrie;

    };

    func getvideodetail(video_trie : Trie.Trie<Text, VideoModel.VideoDetail>, videoId : Text) : async VideoModel.VideoDetail {
        return switch (Trie.get(video_trie, Key.key videoId, Text.equal)) {
            case (?video) { video };
            case null {

                throw Error.reject("video is not present");
            };
        };
    };

    public func viewvideo(video_trie : Trie.Trie<Text, VideoModel.VideoDetail>, videoId : Text, user : Principal) : async Trie.Trie<Text, VideoModel.VideoDetail> {
        let video : VideoModel.VideoDetail = await getvideodetail(video_trie, videoId);

        func change(x : Principal) : Bool {
            x == user;
        };

        let foundvideoid = List.find(video.viewUserId, change);

        if (foundvideoid != null) {
            Debug.trap("You have already view this video");
        } else {

            let updatedviewcount = video.viewcount + 1;

            let updatedviewUserId = List.push(user, video.viewUserId);

            let videoInfo : VideoModel.VideoDetail = {
                videoId = videoId;
                videoTitle = video.videoTitle;
                videobucket = video.videobucket;
                videofile = video.videofile;
                videodescription = video.videodescription;
                videoduration = video.videoduration;
                viewcount = updatedviewcount;
                viewUserId = updatedviewUserId;
            };
            let newTrie = Trie.put(video_trie, Key.key(videoInfo.videoId), Text.equal, videoInfo).0;
            return newTrie;

        };

    };
};
