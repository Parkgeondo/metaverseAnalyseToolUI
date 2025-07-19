import React from "react";
import styles from "./Graphic.module.css";
export default function Graphic_Box(props) {
  const number = `BoxColor${props.number}`;

  return (
    <div className={`${styles.Graphic_Box} ${styles[number]}`}
          style={{'--left':props.left+'px',
                '--top':props.top+'px',
                '--width':props.width+'px',
                '--height':props.height+'px'
                }}
    >
      <div></div>
    </div>
  );
}