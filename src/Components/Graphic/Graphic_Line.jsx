import React from "react";
import styles from "./Graphic.module.css";
export default function Graphic_Line(props) {
  if(props.points.length-1 == props.index){
    return
  }
  const dataX_1 = (parseFloat(props.points[props.index].x))*4.628;
  const dataY_1 = (parseFloat(props.points[props.index].y))*4.628;
  const dataX_2 = (parseFloat(props.points[props.index+1].x))*4.628;
  const dataY_2 = (parseFloat(props.points[props.index+1].y))*4.628;
    // console.log(props.points[props.index+1].x)
    const pathData = `M${dataX_1},${dataY_1} L${dataX_2},${dataY_2}`;

    //index가 끝까지 오면 작동 중지
    //설명작성

  return (
    <div className={styles.Graphic_Line}>
        <svg width="100%" height="100%">
        <path d={pathData} stroke="#2B35AA" strokeWidth="7" fill="none" />
        </svg>
    </div>
  ); 
}