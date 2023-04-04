import React  from "react";
import styles from "./CustomButton.module.css";

const CustomButton = ({content, primary, type, name, onClick}) => {
  const customCssClassName = primary === true ? "important" : "secondary";
  
  return (
    <button
    name      = {name}
    type      = {type}
    onClick   = {onClick}
    className = {styles["custom-button-main-" + customCssClassName]} >
      {content}
    </button>
  )
};

export default CustomButton;