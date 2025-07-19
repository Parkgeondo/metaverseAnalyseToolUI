import React from "react";
import styles from "./Buttons.module.css";
export default function Button(props) {

  return (
    <button className={`${styles.actionButton} ${props.disable == false ? styles.disabled : ""}`} onClick={props.onClick}>
      {props.selectedIcon == 'box' && <span>{props.text || "공간추가"}</span>}
      {props.selectedIcon == 'route' && <span>{props.text || "경로추가"}</span>}
      <div className={styles.buttonanimation}></div>
    </button>
  );
}
