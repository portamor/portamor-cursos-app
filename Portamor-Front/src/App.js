import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import CourseDetail from "./Components/CourseDetail/CourseDetail";
import Home from "./Components/Home/Home"
import ClassDetail from "./Components/ClassDetail/ClassDetail";
import DownloadCertificate from "./Components/Certificate/DownaldCertificate"

function App() {


  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" Component={Home}  />
          <Route exact path="/detalle-curso/:id" Component={CourseDetail} />
<<<<<<< HEAD:Portamor-Front/src/App.js
          <Route exact path="inscripcion" />
=======
          <Route exact path="/clase/:courseId/:videoId" Component={ClassDetail} />     
          <Route exact path="/certificadown" Component={DownloadCertificate} />          

>>>>>>> bb3010adbddc2121648fa59af993d4c9f5def0b9:client/src/App.js
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
