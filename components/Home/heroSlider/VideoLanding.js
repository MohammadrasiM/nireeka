import React from "react";
import ReactPlayer from "react-player";
// import Styles from "/style.module.css";
import Styles from "./style.module.css";

const item = {
  type: "video",
  id: 1,
  name: "nireeka-prime",
  video: "../../../../videos/prime.mp4",
  // href: "../../../videos/prime.mp4",
};
function VideoLanding() {
  return (
    <div key={item.id}>
      <div className="bg-white">
        <div
          className="flex opacity-80 brightness-75 sm:min-h-[630px]"
          style={{ height: "100vh" }}
        >
          <ReactPlayer
            className={Styles.parentVideo}
            playing
            muted
            config={{
              file: {
                attributes: {
                  autoPlay: true,
                  muted: true,
                  controls: false,
                },
              },
            }}
            // height="inherit"
            height="100%"
            width={"100%"}
            url={item.video}
            // playing
            loop
            // muted
          />
        </div>
      </div>
    </div>
  );
}

export default VideoLanding;
