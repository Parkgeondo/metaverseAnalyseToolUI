import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import Buttons from "../Button/Buttons.jsx";

export default function TextInput(props) {

  //색상 선택 함수
  // const [isThirdDivClicked, setThirdDivClicked] = useState(false);

  //제목 저장 변수
  const [title, setTitle] = useState(null);

  //내용 저장 변수
  const [context, setContext] = useState(null);

  //색상 true,false 변경 배열
  const [checkColor, setCheckColor] = useState([false, false, false, false, false, false, false]);
  
  const handleDivClick = (index, color) => {
    const updatedCheckColor = checkColor.map((_, i) => i === index); // 클릭한 요소만 true로 변경
    setCheckColor(updatedCheckColor);
    props.setColor(color);
  };

  //먼저 color 변수를 가져와서 클릭할때마다, 변수를 각 색상으로 바꿈
  //배열로 만들어 놓고 ture, false, true로 정리하기

  return (
    <>
      {/* inputtext가 text가 아니고 none이면 이 부분을 사라지도록*/}
      {props.inputtext === "text" && (
        <div className={styles.TextInput}>
          <div>
            <input type="text" onChange={(e) => {
              setTitle(
                e.target.value
              )
              console.log(title);
            }}/>
            <textarea type="text" onChange={(e) => {
              setContext(
                e.target.value
              )
              }}/>
            {/* 색상을 선택 */}
            {props.selectedIcon === "box" && <>
              <div className={styles.Grid}>
                {/* 색상선택 버튼 */}
                <div
                  className={checkColor[0] ? styles.HighlightedDiv : ""}
                  onClick={() => handleDivClick(0, '#FC0060')}
                ></div>
                <div
                  className={checkColor[1] ? styles.HighlightedDiv : ""}
                  onClick={() => handleDivClick(1, '#FF2725')}
                ></div>
                <div
                  className={checkColor[2] ? styles.HighlightedDiv : ""}
                  onClick={() => handleDivClick(2, '#FD7A02')}
                ></div>
                <div
                  className={checkColor[3] ? styles.HighlightedDiv : ""}
                  onClick={() => handleDivClick(3, '#6BDD35')}
                ></div>
                <div
                  className={checkColor[4] ? styles.HighlightedDiv : ""}
                  onClick={() => handleDivClick(4, '#a235dd')}
                ></div>
                <div
                  className={checkColor[5] ? styles.HighlightedDiv : ""}
                  onClick={() => handleDivClick(5, '#3B64F5')}
                ></div>
                <div
                  className={checkColor[6] ? styles.HighlightedDiv : ""}
                  onClick={() => handleDivClick(6, '#00E0EF')}
                ></div>
              </div>
            </>
            }
            <Buttons
              disable={`${props.selectedIcon === 'box' ? props.pos2 : props.routePos}`}
              selectedIcon={props.selectedIcon}
              onClick={() => {
                props.setInputText('none');
                props.setView(true);

                if (props.selectedIcon === 'box'){
                  props.setBoxCoordinate([
                    ...props.boxCoordinate,
                    {
                      title: title,
                      context: context,
                      color: props.color,
                      coordinate: props.pos2
                    }
                  ]);
                  props.setPos2([]);
                }else if(props.selectedIcon === 'route'){
                  props.setRouteCoordinate([
                    ...props.routeCoordinate,
                    {
                      title: title,
                      context:context,
                      x:props.routePos[0],
                      y:props.routePos[1],
                      id:props.routeCoordinate.length
                    }
                  ]);
                  props.setRoutePos([]);
                }
              }}
            ></Buttons>
          </div>
        </div>
      )}
    </>
  );
}
