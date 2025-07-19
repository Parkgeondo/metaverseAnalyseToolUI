import React from "react";
import styles from "./Buttons.module.css";
export default function SmallBtn(props) {
  return (
    <button className={styles.SmallactionButton}>
      <span>{props.text || "버튼"}</span>
      <div className={styles.buttonanimation}></div>
    </button>
  );
}
