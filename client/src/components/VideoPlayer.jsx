import React, { useEffect, useRef } from "react";
import { Box, Center, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import "./VideoPlayer.css";
export const VideoPlayer = ({ visibility, setVisibility, videoId }) => {
  const videoRef = useRef(null);
  console.log(videoId);
  // useEffect(() => {
  //   const loadVideo = async () => {
  //     // const rangeHeaders = new Headers();
  //     // rangeHeaders.append("Range", "bytes=0-"); // Start streaming from the beginning
  //     // console.log(rangeHeaders);
  //     try {
  //       const response = await axios.get("/video", {
  //         method: "GET",
  //         headers: {
  //           Range: "bytes=0-",
  //         },
  //       });
  //       console.log("hehehe", response.data);

  //       if (!response.data) {
  //         throw new Error("Video data not found");
  //       }

  //       // Convert the received data to a blob
  //       const videoBlob = new Blob([response.data], { type: "video/mp4" });
  //       const videoURL = URL.createObjectURL(videoBlob);
  //       videoRef.current.src = videoURL;
  //       console.log(videoURL);
  //       videoRef.current.load();
  //     } catch (error) {
  //       console.error("Error loading video:", error);
  //     }
  //   };
  //   if (visibility) {
  //     loadVideo();
  //   }
  // }, [visibility]);

  const closeVideo = () => {
    videoRef.current.pause();
    setVisibility(!visibility);
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleLeavePiP = () => {
      if (video) {
        video.pause();
      }
    };

    video.addEventListener("leavepictureinpicture", handleLeavePiP);

    return () => {
      video.removeEventListener("leavepictureinpicture", handleLeavePiP);
    };
  }, []);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      pt={"50px"}
      backgroundColor="rgba(0,0,0,0.3)"
      backdropFilter="blur(20px)"
      zIndex="2"
      display={visibility ? "block" : "none"}
    >
      {/* Video player */}
      <Button
        zIndex={"3"}
        position={"absolute"}
        top={"10px"}
        right={"10px"}
        backgroundColor={"transparent"}
        onClick={closeVideo}
      >
        <CloseIcon />
      </Button>
      <Center>
        <video
          ref={videoRef}
          controls
          className="video-window"
          muted
          autoPlay
          position={"absolute"}
          top={"25px"}
        >
          <source
            src={`http://${window.location.hostname}:8000/video/${videoId}`}
            type="video/mp4"
          />
        </video>
      </Center>
    </Box>
  );
};
