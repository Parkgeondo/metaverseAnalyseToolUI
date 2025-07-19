import React from "react";
import styles from "./Buttons.module.css";
export default function InterectionButton(props) {
  function Icons(props) {
    return <div className={styles.icons}>{props.children}</div>;
  }

  return (
    <button onClick={props.onClick} className={`${styles.InterectionButton} ${props.
      active ? styles.InteractionButton_h : ''}`}>
      <div>
        <Icons>
          {props.children}
        </Icons>
        {props.text}
      </div>
    </button>
  );
}
