import React     from "react";
import Styles    from "./Home.module.css";
import Paginated from "../Paginated/Paginated";

const Home = () => {
  return (
    <div className={Styles["home-container"]}>
      <Paginated />
    </div>
  );
};

export default Home;
