import React from "react";
import styles from "./Sidebar.module.css";


export default function Sidebarleft(props) {
  return <div className={styles.sidebarleft}>{props.children}</div>;
}
