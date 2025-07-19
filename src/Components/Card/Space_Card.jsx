import React from "react";
import styles from "./Section_Card.module.css";
import {ReactComponent as Profile} from "../Img/Profile.svg";

export default function Space_Card(props) {
  return (
    <>
    {props.selectedIcon ==  "box" &&
      <div className={styles.Space_Card}>
        <div className={styles.Title}><span style={{'--color':props.color}}></span><h5> {props.title}</h5></div>
        <span className={styles.Text}>{props.text}</span>
      </div>
    }

    {props.selectedIcon ==  "route" &&
      <div className={`${styles.Route_Card} ${(props.one == 1) && styles.noNumberAfter}`}>
        <div className={styles.Title}><span className={styles.number}>{props.id + 1}</span><h5>{props.title}</h5></div>
        <div className={styles.Text_wrap}><span className={styles.Text}>{props.text}</span></div>
      </div>
    }
    </>
  );
}
