import VideoModel "../models/videoModel";
import HashMap "mo:base/HashMap";
import Error "mo:base/Error";
import Text "mo:base/Text";
import Uuid "../utility/uuid";
import Debug "mo:base/Debug";
import List "mo:base/List";

module {

public func addvideodetail(video_map : HashMap.HashMap<Text, VideoModel.VideoDetail>, videoId : Text, video : VideoModel.VideoInput) : async Text {

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
    video_map.put(videoId, videoInfo);
    return "video Added";

};

func getvideodetail(video_map : HashMap.HashMap<Text, VideoModel.VideoDetail>, videoId : Text) : async VideoModel.VideoDetail {
    return switch (video_map.get(videoId)) {
        case (?video) { video };
        case null {

            throw Error.reject("video is not present");
        };
    };
};

public func viewvideo(video_map : HashMap.HashMap<Text, VideoModel.VideoDetail>, videoId : Text,user:Principal) : async Text {
    let video : VideoModel.VideoDetail = await getvideodetail(video_map, videoId);

    func change(x : Principal) : Bool {
        x == user;
    };

    let foundvideoid = List.find(video.viewUserId, change);

    if (foundvideoid != null) {
        return "You have already view this video";
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
        video_map.put(videoInfo.videoId, videoInfo);

        return "video viewed";


    };

};
};
