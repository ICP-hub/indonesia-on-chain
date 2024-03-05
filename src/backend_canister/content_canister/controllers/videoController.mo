import VideoModel "../models/videoModel";
import HashMap "mo:base/HashMap";
import Error "mo:base/Error";
import Text "mo:base/Text";
import Uuid "../utility/uuid";
import Debug "mo:base/Debug";
import List "mo:base/List";

module {

    public func addvideodetail(video_map:HashMap.HashMap<Text,VideoModel.VideoDetail>,videoId:Text,video:VideoModel.VideoInput) : async Text {

        let videoInfo : VideoModel.VideoDetail = {
            videoId=videoId;
            videoTitle=video.videoTitle;
            videobucket=video.videobucket;
            videofile=video.videofile;
            videodescription=video.videodescription;
            videoduration=video.videoduration;
        };
        video_map.put(videoId,videoInfo);
        return "video Added";

    }

}