import { BrowserRouter }   from "react-router-dom";
import Certificate         from "./Components/Certificate/Certificate";
import Chat                from "./Components/ChatSala/ChatSala";
import ClassDetail         from "./Components/ClassDetail/ClassDetail";
import CourseDetail        from "./Components/CourseDetail/CourseDetail";
import Dashboard           from "./Components/Dashboard/Dashboard";
import DownloadCertificate from "./Components/Certificate/DownaldCertificate"
import Home                from "./Components/Home/Home"
import MyCourses           from "./Components/MyCourses/MyCourses";
import NavBar              from "./Components/NavBar/NavBar";
import { Route }           from "react-router-dom";
import { Routes }          from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" Component={Home}  />
          <Route exact path="/cursos" Component={MyCourses} />
          <Route exact path="/detalle-curso/:courseId" Component={CourseDetail} />
          <Route exact path="/clase/:courseId/:videoId" Component={ClassDetail} />     
          <Route exact path="/certificadown" Component={DownloadCertificate} />
          <Route exact path="/certificado" Component={Certificate} />
          <Route exact path="/dashboard" Component={Dashboard} /> 
          <Route exact path="/chat" Component={Chat} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
