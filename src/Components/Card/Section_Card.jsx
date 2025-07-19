import React from "react";
import styles from "./Section_Card.module.css";
import {ReactComponent as Profile} from "../Img/Profile.svg";

import {ReactComponent as Section_map_1} from "../Img/Section_map_1.svg";
import {ReactComponent as Section_map_2} from "../Img/Section_map_2.svg";
import {ReactComponent as Section_map_3} from "../Img/Section_map_3.svg";
import {ReactComponent as Section_map_4} from "../Img/Section_map_4.svg";
import { div } from "three/examples/jsm/nodes/Nodes.js";


export default function Section_Card(props) {

  function Img(props) {
    return <div className={styles.Img}>{props.children}</div>;
  }

  const getBorderColor = () => {
    switch (props.number) {
      case 1:
        return '#6BDD35';
      case 2:
        return '#35DDDD';
      case 3:
        return '#C635DD';
      case 4:
        return '#DDCD35';
      default:
        return 'initial';
    }
  };

  const spanStyle = {
    border: `4px solid ${getBorderColor()}`,
  };


  return (
    <div className={styles.Section_Card}>
      <div className={styles.title}>
        <span
        ></span>
        {props.space == false ? <h4>이벤트 공간 {props.number}</h4> : <h4>사물{props.number}</h4>}
      </div>
        <div className={styles.section}>
         {props.space == false ? <h5>공간 사용 비율</h5> : <h5>구역별 개요</h5>} 
         {props.space == false ? <div>
            {props.number == 1 && <Section_map_1></Section_map_1>}
            {props.number == 2 && <Section_map_2></Section_map_2>}
            {props.number == 3 && <Section_map_3></Section_map_3>}
            {props.number == 4 && <Section_map_4></Section_map_4>}
          </div> : <div className={styles.graph}>
             <div><Img>
                  <Profile></Profile>
                </Img></div>
             <div><Img>
                  <Profile></Profile>
                </Img></div>
             <div><Img>
                  <Profile></Profile>
                </Img></div>
          </div>}
        </div>
        <div className={styles.ranking}>
          <h5>공간을 사용한 순위</h5>
            <div className={styles.player}>
              <div className={styles.id}>
                <Img>
                  <Profile></Profile>
                </Img>
                <span>#11314151</span>
              </div>
              <div className={styles.id}>
                <Img>
                  <Profile></Profile>
                </Img>
                <span>#20121451</span>
              </div>
              <div className={styles.id}>
                <Img>
                  <Profile></Profile>
                </Img>
                <span>#12123123</span>
              </div>
            </div>
        </div>
    </div>
  );
}
