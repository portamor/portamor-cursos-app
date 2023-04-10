import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import VideoCard       from "../VideoCard/VideoCard";   
import styles          from "./ShowCreatedVideos.module.css"
import * as actions    from "../../Redux/actions"

const ShowCreatedVideo = ({ setActualForm }) => {
  const dispatch = useDispatch();

  const videosOfCreatedSection = useSelector(state => state.videosOfCreatedSection);
  const sectionToAddVideo      = useSelector(state => state.sectionToAddVideo);

   useEffect(()=>{
    dispatch(actions.getVideosOfCreatedSection(sectionToAddVideo.id))
   }, [sectionToAddVideo, dispatch])
  
  return (
    <div className={styles["show-videos-main"]}>
      <h1>Videos creados </h1>
      {
       videosOfCreatedSection.map(video => <VideoCard key={video.id} title={video.videoTitle}/>)
      }
    </div>
  )
}

export default ShowCreatedVideo;