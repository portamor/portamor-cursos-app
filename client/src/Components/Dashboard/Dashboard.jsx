import React                   from "react";
import * as constants          from "../../constants";
import styles                  from "./Dashboard.module.css"
import FormSelector from "../FormSelector/FormSelector";

const Dashboard = () => {




  return (
    <div className={styles.div_dashboard} >
      <FormSelector/>
     
    
    </div>
  )
}

export default Dashboard;