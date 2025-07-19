import { React, useState } from "react";
import "../index.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";


import Button from "../Components/Button/Buttons";
import TitleHead from "../Components/Title/Titlehead";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/SideBar/Sidebar";
import Sidebarleft from "../Components/SideBar/Sidebarleft";
import BigSidebar from "../Components/SideBar/BigSidebar";

import mapImg_top from "../Components/Img/mapImg_top.png";

import Mappage from "../UiPage/Mappage";
import Graphic_drawBox from "../Components/Graphic/Graphic_drawBox";
import Graphic_putNumber from "../Components/Graphic/Graphic_putNumber";
import Resultpage from "../UiPage/Resultpage";

export default function Mainpage() {
  const [fileName, setfileName] = useState("첨부파일을 넣어주세요.");
  const [navfileName, setnavfileName] = useState("네비게이션 파일을 넣어주세요.");
  const [selectedIcon, setSelectedIcon] = useState("map");

  // 선택된 아이콘
  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
  };

  //현재 작성하는 부분
  const [inputtext, setInputText] = useState("text");

  // 색상선택
  const [color, setColor] = useState(null);

  // 좌표 색상 영구 저장
  const [color_save, setPos2_save] = useState([]);

  // 좌표 임시 저장
  const [pos2, setPos2] = useState([]);

  // 좌표 영구 저장
  const [pos3, setPos3] = useState([]);

  // 루트 임시 저장
  const [routePos, setRoutePos] = useState([]);

  // box에서 저장된 좌표들
  const [boxCoordinate, setBoxCoordinate] = useState([]);
  
  // route에서 저장된 좌표들
  const [routeCoordinate, setRouteCoordinate] = useState([
 
  ]);

  const [tab, setTab] = useState("space");

  // 캔버스에 전체 박스들 표시하기
  const [view, setView] = useState(false);
  
  return (
  // 전체 화면 보여주는 부분
    <div className="PageWrapper">
      <Header></Header>
      <div className="sideWrapper">
        <BigSidebar
          selectedIcon={selectedIcon}
          handleIconClick={handleIconClick}
          valueMap={fileName}
          valueNav={navfileName}
          onChangeMap={(e) => {
            setfileName(e.target.value);
          }}

          inputtext={inputtext}
          setInputText={setInputText}

          color={color}
          setColor={setColor}
          pos2 = {pos2}
          setPos2 = {setPos2}
          pos3 = {pos3}
          setPos3 = {setPos3}

          routePos={routePos}
          setRoutePos={setRoutePos}

          color_save={color_save}
          setPos2_save={setPos2_save}

          boxCoordinate={boxCoordinate}
          setBoxCoordinate={setBoxCoordinate}
          
          routeCoordinate={routeCoordinate}
          setRouteCoordinate={setRouteCoordinate}

          view = {view}
          setView = {setView}

          tab = {tab}
          setTab ={setTab}
        ></BigSidebar>
        {selectedIcon === "map" || selectedIcon === "box" || selectedIcon ==="route" ? 
        <div>
          {selectedIcon === "box" ? <Graphic_drawBox pos2={pos2} setPos2={setPos2} pos3={pos3}  setPos3={setPos3} color={color} boxCoordinate={boxCoordinate}
          setBoxCoordinate={setBoxCoordinate} view = {view} inputtext={inputtext} /> : null}
          {selectedIcon ==="route" ? <Graphic_putNumber routeCoordinate={routeCoordinate} setRouteCoordinate={setRouteCoordinate} inputtext={inputtext} setInputText={setInputText} routePos={routePos} setRoutePos={setRoutePos}/> : null}
           <Mappage fileName={fileName} selectedIcon={selectedIcon}
           />
        </div>
        : null}
        {selectedIcon === "result" && <Resultpage tab={tab} setTap={setTab}boxCoordinate={boxCoordinate} routeCoordinate={routeCoordinate}/>}
        {selectedIcon === "play" && <div className="frame">
            <iframe
              title="Local Page"
              //이부분?
              src="https://parkgeondo.github.io/metaverseSpace/"
              frameborder={0} framespacing={0} marginheight={0} marginwidth={0}  vspace={0}
            ></iframe>
          </div>}
      </div>
    </div>
  );
}
