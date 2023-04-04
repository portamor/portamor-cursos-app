import React  from "react";
import styles from "./CustomButton.module.css";

const CustomButton = ({content, primary, type, onClick}) => {
  const customCssClassName = primary === true ? "important" : "secondary";
  
  return (
    <button 
    type      = {type}
    onClick   = {onClick}
    className = {styles["custom-button-main-" + customCssClassName]} >
      {content}
    </button>
  )
};

export default CustomButton;