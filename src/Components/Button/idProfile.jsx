import React from "react";
import styles from "./Buttons.module.css";
import { ReactComponent as Check } from "../Icons/check.svg";

export default function IdProfile(props) {
  const display = props.visible ? 'visible' : 'hidden';
  function Icons(props) {
    return <div className={styles.icons}>{props.children}</div>;
  }

  return (
    <button className={`${styles.idProfile} ${props.state ? styles.active : ''}`} onClick={props.onClick}>
        <div><Check style={{'visibility':display}} className={styles.checkStyle}></Check></div>{props.id}
    </button>
  );
}