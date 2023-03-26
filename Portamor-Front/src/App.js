import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import CourseDetail from "./Components/CourseDetail/CourseDetail";
import Home from "./Components/Home/Home"

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" Component={Home}  />
          <Route exact path="/detalle-curso/:id" Component={CourseDetail} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
