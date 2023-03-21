import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import CourseDetail from "./Components/CourseDetail/CourseDetail";

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route />
          <Route exact path="/detalle-curso/:id" Component={CourseDetail}/>
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
