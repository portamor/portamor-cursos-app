import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
