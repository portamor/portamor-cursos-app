import React  from "react";
import styles from "./CustomButton.module.css";

const CustomButton = ({content, primary, type, name, disabled, onClick}) => {
  let customCssClassName = primary === true ? "important" : "secondary";

  if(type === "submit") customCssClassName += "-submit";

  if(type === "submit" && primary === false) customCssClassName += "-secondary";
  
  return (
    <button
    name      = {name}
    disabled  = {disabled}
    type      = {type}
    onClick   = {onClick}
    className = {styles["custom-button-main-" + customCssClassName]} >
      {content}
    </button>
  )
};

export default CustomButton;