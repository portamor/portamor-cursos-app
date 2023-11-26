import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import ReactPlayer from 'react-player';
import CustomButton from "../CustomButton/CustomButton";
import SelectedData from "../SelectedData/SelectedData";
import * as actions from "../../Redux/actions";
import * as constants from "../../constants/classDetailConstants";
import styles from "./ClassDetail.module.css";

const ClassDetail = (props) => {
  const dispatch    = useDispatch();
  const match       = useMatch('/clase/:courseId/:videoId');
  const courseId    = match.params.courseId;
  const videoId     = match.params.videoId;
  const userDetail  = useSelector((state) => state?.user);
  const userId      = userDetail.id;

  useEffect(() => {
    dispatch(actions.getCourseDetail(courseId));
    dispatch(actions.getVideosCourse(courseId));
    dispatch(actions.getVideoStateCourse(userId, courseId));
    videoId !== 0 && dispatch(actions.getVideoById(videoId));
  }, [courseId, videoId, dispatch, userId])

  const videoDetail  = useSelector((state) => state.videoDetail);
  const courseDetail = useSelector((state) => state.courseDetail);
  const videosCourse = useSelector((state) => state?.videosOfCourse.flat());
  const videosState  = useSelector((state) => state?.videoStateCourse.flat());

  const [firstSelectedButton, setFirstSelectedButton]   = useState(constants.VER_TEMARIO);
  const [secondSelectedButton, setSecondSelectedButton] = useState(constants.PREGUNTAS_FRECUENTES);
  const [allVideosWatched, setAllVideosWatched] = useState(false);

  const handleFirstSelectData  = (selectedButtonContent) => setFirstSelectedButton(selectedButtonContent);
  const handleSecondSelectData = (selectedButtonContent) => setSecondSelectedButton(selectedButtonContent);

  const payload  = {
    userId: userId,
    videoId: videoId,
    watched: true ,
    courseId: courseId
    }

    useEffect(() => {
      if (videosState.length >= videosCourse.length - 1) {
        setAllVideosWatched(true);
      } else {
        setAllVideosWatched(false);
      }
    }, [videosState.length,  videosCourse.length ]);

  const handleEnd = async () => {
    dispatch(actions.createVideoState(payload))
    if (videosState.length >= videosCourse.length-1 ) {
      setAllVideosWatched(true)
    }
  };

  return (
    <div className={styles["class-detail-main"]}>
      <div className={styles["class-container"]}>
        <div className={styles["resource-viewer-container"]}>
          <div className={styles["react-player"]}>
            {
              videoDetail.isVideo ?
              (
                <ReactPlayer 
                  url={videoDetail.videoLink}
                  controls
                  width='100%'
                  height='100%'
                  className={styles["resource-iframe"]}
                  onEnded={handleEnd}
                />
              )
              :
              (
                <>
                  <iframe
                    id="resourceIFrame"
                    style={{margin: 'auto'}}
                    className={styles["resource-iframe"]}
                    title="Resource Iframe"
                    width="100%"
                    height="100%"
                    src={videoDetail.videoLink}
                  >
                  </iframe>
                </>
              )
            }
          </div>
          {
            !videoDetail.isVideo && (
              <div className={styles["buttons-container"]}>
                <CustomButton
                  primary={true}  
                  content={'COMPLETADO'}
                  type={'button'}
                  onClick={handleEnd}
                  disabled={false}
                />
              </div>
            )
          }
        </div>

        <div className={styles["course-manage-container"]}>
          <div className={styles["description-container"]}>
            <h2 className={styles["description-title"]}>{courseDetail.title}</h2>
          </div>

          <div className={styles["syllabus-instructor-container"]}>
            <div className={styles["buttons-container"]}>
              <CustomButton
                primary={firstSelectedButton === constants.VER_TEMARIO ? true : false}  
                content={constants.VER_TEMARIO}
                onClick={() => handleFirstSelectData(constants.VER_TEMARIO)}
              />
              <CustomButton
                primary={firstSelectedButton === constants.SOBRE_EL_INSTRUCTOR ? true : false}  
                content={constants.SOBRE_EL_INSTRUCTOR}
                onClick={() => handleFirstSelectData(constants.SOBRE_EL_INSTRUCTOR)}
              />
            </div>
            {
              firstSelectedButton && 
              <SelectedData 
                courseId={courseId}
                courseDetail={courseDetail} 
                selectedButtonContent={firstSelectedButton}
              />
            }
          </div>
        </div>
      </div>
      <div className={styles["options-container"]}>
        <div className={styles["buttons-container"]}>
          <CustomButton 
            primary={secondSelectedButton === constants.COMENTARIOS ? true : false}  
            content={constants.COMENTARIOS}
            onClick={() => handleSecondSelectData(constants.COMENTARIOS)}
          />
          <CustomButton 
            primary={secondSelectedButton === constants.MATERIALES ? true : false}
            content={constants.MATERIALES}
            onClick={() => handleSecondSelectData(constants.MATERIALES)}
          />
          <CustomButton 
            primary={secondSelectedButton === constants.PARTICIPANTES ? true : false}
            content={constants.PARTICIPANTES} 
            onClick={() => handleSecondSelectData(constants.PARTICIPANTES)}
          />
          <CustomButton 
            primary={secondSelectedButton === constants.PREGUNTAS_FRECUENTES ? true : false}
            content={constants.PREGUNTAS_FRECUENTES}
            onClick={() => handleSecondSelectData(constants.PREGUNTAS_FRECUENTES)}
          />
          { 
            allVideosWatched &&
            <CustomButton 
              primary={secondSelectedButton === constants.DESCARGA_CERTIFICADO ? true : false}
              content={constants.DESCARGA_CERTIFICADO}
              onClick={() => handleSecondSelectData(constants.DESCARGA_CERTIFICADO)}
            />
          }
        </div>

        <div className={styles["cards-container"]}>
          {
            secondSelectedButton &&
            <SelectedData 
              courseId={courseId}
              courseDetail={courseDetail} 
              selectedButtonContent={secondSelectedButton}
            />
          }
        </div>
      </div>
    </div>
  )
};

export default ClassDetail;