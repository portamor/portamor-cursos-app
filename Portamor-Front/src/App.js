import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import CourseDetail from "./Components/CourseDetail/CourseDetail";
import NavFilter from "./Components/NavFilter/NavFilter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <NavFilter />
        <Routes>
          <Route />
          <Route exact path="/detalle-curso/:id" Component={CourseDetail} />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
