import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import CourseDetail from "./Components/CourseDetail/CourseDetail";
import Home from "./Components/Home/Home";
import ClassDetail from "./Components/ClassDetail/ClassDetail";
import DownloadCertificate from "./Components/Certificate/DownaldCertificate";
import Dashboard from "./Components/Dashboard/Dashboard";
import Chat from "./Components/ChatSala/ChatSala";
import Certificate from "./Components/Certificate/Certificate";
import Modal from "./Components/Modal/Modal";
import MyCourses from "./Components/MyCourses/MyCourses";
import Footer from "./Components/Footer/Footer";

function App() {
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  const isAdmin = user?.admin;

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/detalle-curso/:courseId" element={<CourseDetail />} />

          {isLoggedIn ? (
            <>
              <Route exact path="/clase/:courseId/:videoId" element={<ClassDetail />} />
              <Route exact path="/certificadown" element={<DownloadCertificate />} />
              <Route exact path="/certificado" element={<Certificate />} />
              <Route exact path="/chat" element={<Chat />} />
              <Route exact path="/cursos" Component={MyCourses} />
            </>
          ) : (
            <Route path="*" element={<Modal onClose={() => setShowModal(false)} />} />

          )}
           {isAdmin && (
          <Route exact path="/dashboard" element={<Dashboard />} />
           )}
        </Routes>
        <Footer />
      </BrowserRouter>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>Modal Content</div>
        </Modal>
      )}
    </div>
  );
}


export default App;


