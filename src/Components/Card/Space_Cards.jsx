import React from "react";
import styles from "./Section_Card.module.css";
import Space_Card from "../Card/Space_Card";


export default function Space_Cards(props) {
  return (
    <>
    {/* inputtext가 none가 아니고 text이면 이 부분을 사라지도록*/}
    {props.inputtext === "none" && (
      <>
        {props.selectedIcon === "box" &&
          <div className={styles.Space_Cards}>
            {
              props.boxCoordinate.map(function(a, i){
                return (
                  <Space_Card selectedIcon={props.selectedIcon} key={i} title={a.title} color={a.color} text= {a.context}/>
                )
              })
            }
          </div>
        }
        {props.selectedIcon === "route" &&
          <div className={styles.Space_Cards}>
            {
              props.routeCoordinate.map(function(a, i){
                return (
                  <Space_Card selectedIcon={props.selectedIcon} one = {props.routeCoordinate.length} key={i} id={a.id} title={a.title} color={a.color} text= {a.context}/>
                )
              })
            }
          </div>
        }
      </>
      )}
    </>
  );
}
