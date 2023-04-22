import * as actions    from "../../Redux/actions";
import certifiedImg    from "../../images/certified-portamor.svg"
import * as constants  from "../../constants/classDetailConstants";
import CustomButton    from "../CustomButton/CustomButton";
import React           from "react";
import ReactPlayer     from 'react-player';
import SelectedData    from "../SelectedData/SelectedData";
import styles          from "./ClassDetail.module.css";
import { useDispatch } from "react-redux";
import { useEffect }   from "react";
import { useMatch }    from "react-router-dom";
import { useSelector } from "react-redux";
import { useState }    from "react";
import * as utils      from "../../utils";

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
  const courseRating = utils.getStarsRating(courseDetail.rating);

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
      <div className={styles["video-description-container"]}>
        <div>
          <h1 className={styles["course-title"]}>
            Curso de {" "}
            <span className={styles["course-title-color"]}>{courseDetail.title}</span>
          </h1>
          <div className={styles["react-player"]}>
            <ReactPlayer 
            url={videoDetail.videoLink} 
            width='100%'
            height='100%'
            onEnded={handleEnd}/>
          </div>
        </div>
        
        <div className={styles["description-container"]}>
          <h2 className={styles["description-title"]}>Descripcion del curso</h2>
          <p className={styles["description-text"]}>{ courseDetail.description }</p>
          <span className={styles["stars-container"]}>
            Valoracion del curso: { courseRating }
          </span>
          <div className={styles["certified-container"]}>
            <span>Incluye certificado:</span>
            <strong>Si</strong>
            <img src={certifiedImg} alt="certified" />
          </div>
          <div className={styles["buttons-container"]}>
            <CustomButton 
            primary={firstSelectedButton === constants.VER_TEMARIO ? true : false}  
            content={constants.VER_TEMARIO}
            onClick={() => handleFirstSelectData(constants.VER_TEMARIO)} />
            <CustomButton 
            primary={firstSelectedButton === constants.SOBRE_EL_INSTRUCTOR ? true : false}  
            content={constants.SOBRE_EL_INSTRUCTOR}
            onClick={() => handleFirstSelectData(constants.SOBRE_EL_INSTRUCTOR)} />
          </div>
        </div>
      </div>

      <div className={styles["secciones-temario-container"]}>
        <div className={styles["buttons-and-cards-container"]}>
          <div className={styles["buttons-sections-container"]}>
            <CustomButton 
            primary={secondSelectedButton === constants.COMENTARIOS ? true : false}  
            content={constants.COMENTARIOS}
            onClick={() => handleSecondSelectData(constants.COMENTARIOS)} />
            <CustomButton 
            primary={secondSelectedButton === constants.MATERIALES ? true : false}
            content={constants.MATERIALES}
            onClick={() => handleSecondSelectData(constants.MATERIALES)} />
            <CustomButton 
            primary={secondSelectedButton === constants.PARTICIPANTES ? true : false}
            content={constants.PARTICIPANTES} 
            onClick={() => handleSecondSelectData(constants.PARTICIPANTES)} />
            <CustomButton 
            primary={secondSelectedButton === constants.PREGUNTAS_FRECUENTES ? true : false}
            content={constants.PREGUNTAS_FRECUENTES}
            onClick={() => handleSecondSelectData(constants.PREGUNTAS_FRECUENTES)} />

          { allVideosWatched &&  <CustomButton 
            primary={secondSelectedButton === constants.DESCARGA_CERTIFICADO ? true : false}
            content={constants.DESCARGA_CERTIFICADO}
            onClick={() => handleSecondSelectData(constants.DESCARGA_CERTIFICADO)} />}
          </div>

          <div className={styles["cards-container"]}>
            {
            secondSelectedButton && 
            <SelectedData 
              courseId={courseId}
              courseDetail={courseDetail} 
              selectedButtonContent={secondSelectedButton} />
            }
          </div>
        </div>
        
        {
          firstSelectedButton && 
          <SelectedData 
            courseId={courseId}
            courseDetail={courseDetail} 
            selectedButtonContent={firstSelectedButton} />
        }
      </div>

    </div>

  )
};

export default ClassDetail;