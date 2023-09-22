import * as actions    from "../../Redux/actions"
import Paginated from "../Paginated/Paginated";
import React     from "react";
import Styles    from "./Home.module.css";
import { useEffect }   from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NavFilter from "../NavFilter/NavFilter";

const Home = () => {
  return (
    <div className={Styles["home-container"]}>
      <NavFilter actualPage={"HOME"}/>
      <Paginated />
    </div>
  );
};

export default Home;
