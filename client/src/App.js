import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import CourseDetail from "./Components/CourseDetail/CourseDetail";
import Home from "./Components/Home/Home"
import ClassDetail from "./Components/ClassDetail/ClassDetail";
import DownloadCertificate from "./Components/Certificate/DownaldCertificate"
import Dashboard from "./Components/Dashboard/Dashboard";
import Chat from "./Components/ChatSala/ChatSala";
import Certificate from "./Components/Certificate/Certificate";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" Component={Home}  />
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
