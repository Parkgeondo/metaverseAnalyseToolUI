import React from "react";
import styles from "./Buttons.module.css";
export default function InterectionTab(props) {
  return (
    <div className={styles.InterectionTab}>
      <div className={`${styles.Tab} ${props.tab == 'inter' ? styles.Bottom_Line : ''}`} onClick={()=>{props.setTab('inter')}}>인터렉션 별</div>
      <div className={`${styles.Tab} ${props.tab == 'player' ? styles.Bottom_Line : ''}`} onClick={()=>{props.setTab('player')}}>사용자 별</div>
    </div>
  );
}
