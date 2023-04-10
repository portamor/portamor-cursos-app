import * as actions    from "../../Redux/actions"
import { useDispatch } from "react-redux";
import { useEffect }   from "react";
import { useSelector } from "react-redux";
import React           from "react";
import styles          from "./ShowCreatedVideos.module.css"
import VideoCard       from "../VideoCard/VideoCard";   

const ShowCreatedVideo = () => {
  const dispatch = useDispatch();

  const videosOfCreatedSection = useSelector(state => state.videosOfCreatedSection);
  const sectionToAddVideo      = useSelector(state => state.sectionToAddVideo);

   useEffect(()=>{
    dispatch(actions.getVideosOfCreatedSection(sectionToAddVideo.id))
   }, [sectionToAddVideo, videosOfCreatedSection, dispatch])
  
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