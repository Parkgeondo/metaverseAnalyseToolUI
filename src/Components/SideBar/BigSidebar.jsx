import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Sidebarleft from "./Sidebarleft";

import Space_Cards from "../Card/Space_Cards";

import Contextcard from "../Title/Contextcard";
import styles from "./Sidebar.module.css";
import TitleHead from "../Title/Titlehead";
import TextInput from "../SideBar/TextInput";

import InteractionButton from "../Button/InteractionButton";
import InteractionTab from "../Button/InteractionTab";

import { ReactComponent as Box } from "../Icons/box.svg";
import { ReactComponent as Obj } from "../Icons/obj.svg";
import { ReactComponent as People } from "../Icons/people.svg";

export default function BigSidebar(props) {

  const text = {
    "map":{
      "Title":'맵관리',
      "Content":'사용성을 탐색하고 싶은 맵을 넣는 시작단계입니다. 맵을 둘러보면서 사용성을 탐색하기전 준비를 할 수 있습니다.'
    },
    "box":{
      "Title":'공간 지정',
      "Content":'각 맵의 일부 구역에 이름을 붙입니다. 각 공간에 따라서 관찰 정보를 관리할 수 있습니다.'
    },
    "route":{
      "Title":'동선 부여',
      "Content":'사용자가 이동하는 예상 이동 경로를 설정합니다. 최대 경로 지점은 15개까지 설정 가능합니다.'
    },
    "checkcircle":{
    },
    "result":{
      "Title":'결과 대쉬보드',
      "Content":'맵을 통해 수집된 정보들을 볼 수 있습니다. 미션이나 사용자에 따라서 각자 결과들을 따로 볼 수 있습니다.'
    },
    "play":{
      "Title":'',
      "Content":''
    }
  }

  //각 메뉴에 맞는
  const title = props.selectedIcon ? text[props.selectedIcon].Title : '';
  const Content = props.selectedIcon ? text[props.selectedIcon].Content : '';

  //결과 대쉬보드에서 tab 인터렉션별 <-> 사용자별
  const [tab, setTab] = useState("inter");

  //공간을 추가하는 데이터 정리
  const [spaceData, setSpaceData] = useState([]);


  
  //공간지정에서 공간 설명의 제목과 내용을 한꺼번에 저장하는 변수, 그래서 공간 추가 버튼을 눌렀을때, space_Card의 내용으로 저장될 수 있도록
  const [spaceCard_title, setSpaceCard_title] = useState([]);
  const [spaceCard_context, setSpaceCard_context] = useState([]);


  return (
    <div className={styles.BigSidebar}>

      {/*가장 왼쪽에 위치한 메뉴바, 지도, 공간, 루트를 설정할 수 있다*/}
      <Sidebar
        selectedIcon={props.selectedIcon}
        handleIconClick={props.handleIconClick}
      ></Sidebar>

      {/* 만약 플레이메뉴를 누르고 있는 상태라면, 큰 사이드바가 사라짐 */}
      {props.selectedIcon === "play" ? '' : 
      <Sidebarleft
      children={
        <div className={styles.SideWrapper}>
          {/* 만약 현재화면이 맵관리이거나 결과 대시보드라면 버튼이 없는 TitleHead를 가진다*/}
          {(props.selectedIcon === "map" || 
            props.selectedIcon === "result") ? 
          <TitleHead
            Title={title}
            Content={Content}
          ></TitleHead>:
          <TitleHead
            Title={title}
            Content={Content}
            type={"buttontype"}
            selectedIcon = {props.selectedIcon}
            inputtext={props.inputtext}
            setInputText={props.setInputText}

            view={props.view}
            setView={props.setView}
          ></TitleHead>
          }

           {/* selectedIcon가 map일때, 맵을 선택하는 화면으로 변경 */}
          {props.selectedIcon === "map" && <div>
            <Contextcard
            value={props.valueMap}
            placeholder={props.placeholderMap}
            type={"buttontype"}
            Title={"Map"}
            context={""}
            onChange={props.onChangeMap}
          ></Contextcard>

          {/* <Contextcard
            value={props.valueNav}
            placeholder={props.placeholderNav}
            type={"buttontype"}
            Title={"NAV-MESH"}
            context={""}
            onChange={props.onChangeNav}
          ></Contextcard> */}
          </div>}

          {/* selectedIcon가 box일때, 공간을 지정하는 탭으로 변경 */}

          {/* selectedIcon가 box일때, 공간의 설명을 작성하는 부분 */}
          {(props.selectedIcon === "box" || 
            props.selectedIcon === "route") ? <div>
            <TextInput
              selectedIcon={props.selectedIcon}

              inputtext={props.inputtext}
              setInputText={props.setInputText}

              color = {props.color}
              setColor = {props.setColor}

              pos2 = {props.pos2}
              setPos2 = {props.setPos2}

              pos3 = {props.pos3}
              setPos3 = {props.setPos3}

              routePos={props.routePos}
              setRoutePos={props.setRoutePos}
        
              color_save={props.color_save}
              setPos2_save={props.setPos2_save}

              boxCoordinate={props.boxCoordinate}
              setBoxCoordinate={props.setBoxCoordinate}

              routeCoordinate={props.routeCoordinate}
              setRouteCoordinate={props.setRouteCoordinate}

              view = {props.view}
              setView = {props.setView}
          ></TextInput>
          </div> : null
          }

          {/* selectedIcon가 box일때, 공간의 설명이 적힌 부분 */}
          {(props.selectedIcon === "box" || props.selectedIcon === "route") &&<div>
          <Space_Cards
            color_save={props.color_save}
            inputtext={props.inputtext}
            spaceCard_title={spaceCard_title}
            spaceCard_context={spaceCard_context}
            selectedIcon={props.selectedIcon}
            boxCoordinate={props.boxCoordinate}
            routeCoordinate={props.routeCoordinate}
          ></Space_Cards>
          </div>}


          {/* 결과 대시보드 */}
          {props.selectedIcon === "result" && <div>
            {/* <InteractionTab tab={tab} setTab={setTab}></InteractionTab> */}
          <div className={styles.InteractionButtons}>
            <InteractionButton tab={props.tab} active={props.tab == 'space'} onClick={()=>{props.setTab('space');}} text={'공간 인터렉션'} highlight={"highlight"}>
                <Box
                  width={32}
                  height={32}
                  stroke="white"
                ></Box>
            </InteractionButton>
            <InteractionButton tab={props.tab} active={props.tab == 'box'} onClick={()=>{props.setTab('box');}} setTab={setTab} text={'사물 인터렉션'}>
              <Obj
                width={32}
                height={32}
                stroke="white"
              ></Obj>
            </InteractionButton>
            <InteractionButton tab={props.tab} active={props.tab == 'people'} onClick={()=>{props.setTab('people');}} setTab={setTab} text={'사람 인터렉션'}>
              <People
                width={32}
                height={32}
                stroke="white"
              ></People>
            </InteractionButton>
          </div>
          </div>}
        </div>
      }
    />
      }
      
    </div>
  );
}
