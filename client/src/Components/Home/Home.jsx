import Paginated from "../Paginated/Paginated";
import React     from "react";
import Styles    from "./Home.module.css";

const Home = () => {
  return (
    <div className={Styles["home-container"]}>
      <Paginated actualPage={"HOME"}/>
    </div>
  );
};

export default Home;
