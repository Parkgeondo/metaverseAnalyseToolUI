import {React, useEffect, useState} from "react";
import styles from "./Uipage.module.css";
import {ReactComponent as Map} from "../Components/Img/Map.svg";
import {ReactComponent as Map_vertical} from "../Components/Img/Map_vertical.svg";
import {ReactComponent as Map_section} from "../Components/Img/Map_section.svg";
import {ReactComponent as Map_section_box} from "../Components/Img/Map_section_box.svg";
import {ReactComponent as Map_section_people} from "../Components/Img/Map_section_people.svg";
import Graphic_Circle from "../Components/Graphic/Graphic_Circle";
import Graphic_Line from "../Components/Graphic/Graphic_Line";
import Graphic_Box from "../Components/Graphic/Graphic_Box";
import IdProfile from "../Components/Button/idProfile";
import ResultProfile from "../Components/Button/ResultProfile";
import Section_Card from "../Components/Card/Section_Card";

import {ReactComponent as Profile} from "../Components/Img/Profile.svg";

import {db} from '../database.js'

export default function Resultpage(props) {
    function Img(props) {
        return <div className={styles.Img}>{props.children}</div>;
    }
    
    const Data_List = [1, 2, 3, 4]
    const Data_List2 = [1, 2, 3]
    const a = 1
    const Section_Card_List = Data_List.map(
        (number) => (<Section_Card space={false} number={number} key={number}/>)
    )
   
    const Section_Card_List2 = Data_List2.map(
        (number) => (<Section_Card space={true} number={number} key={number}/>)
    )

    const [datas, setDatas] = useState([]);
    const [ids, setIds] = useState();
    
    useEffect(function () {
        db.collection('post').doc('Test').get().then(function(doc){
            const dataValues = Object.values(doc.data());
            console.log(dataValues)
            setDatas(dataValues);
            let temidset = [];
            dataValues.map((item, index) => {
                temidset.push({
                    id: item.id,
                    active: true
                });
            });
            setIds(temidset);
        });
    }, []);
    
    const changeId = (index) => {
        const newIds = [...ids];
        newIds[index] = { ...newIds[index], active: !newIds[index].active };
        setIds(newIds);
    };

    let radius = 0;

    //공간표시
    const dataSpaces = [
        { x: 0, y: 20, w:200, h:180},
        { x: 50, y: 20, w:200, h:80},
        { x: 115, y: 58, w:110, h:70},
        { x: 200, y: 30, w:200, h:140}
    ];

    const Box_Lists = dataSpaces.map((item, index) => {
        const dataX = (parseFloat(item.x))*4.628;
        const dataZ = (parseFloat(item.y))*4.628;
        const dataW = item.w;
        const dataH = item.h;
        return (
            <Graphic_Box
                top={dataZ}
                left={dataX}
                height={dataH}
                width={dataW}
                number={index}
                key={index}
            />
        )
    })

    //동선표시
    const dataPoints = [
        { x: 220, y: 34 },
        { x: 150, y: 74 },
        { x: 100, y: 65 },
        { x: 20, y: 70 },
        { x: 0, y: 40 }
    ];
    
    const Line_Lists = dataPoints.map((item, index) => {
        console.log(index)
        return (
            <Graphic_Line
                points = {dataPoints}
                index = {index}
                key={index}
            />
        )
    })

    //원 표시
    const Circle_Lists = datas.map((item, index) => {

        let  temporary_1 = item;
        let  temporary_2 = index;
        let  id = item.id;


        const Circle_List = item.positiondata.map((item, index) => {
            const dataX = (-parseFloat(item.x) + 60)*3.628;
            const dataZ = (parseFloat(item.z) + 210.29)*3.528;

            let distance = 0;
            
            if(index !== 0){
                const x1 = parseFloat(temporary_1.positiondata[index -1].x);
                const z1 = parseFloat(temporary_1.positiondata[index -1].z);
                const x2 = parseFloat(temporary_1.positiondata[index].x);
                const z2 = parseFloat(temporary_1.positiondata[index].z);
                distance = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
            }

            if (distance < 1) {
                radius = radius + 1;
                if (radius > 15.0) {
                  radius = 15;
                }
              } else {
                radius = 3;
              }

            return (
                <Graphic_Circle
                    top={dataX}
                    left={dataZ}
                    size={radius*8}
                    id={id}
                    number={temporary_2}
                    key={index}
                    visible={ids[temporary_2].active}
                />
              );
        })
        return (
            Circle_List
        );
    })

// 결과값에 나오는 종합 정보
    const resultAll = () => {
   
        const spacedataValues = datas.map(item => item.spacedata);
        const averageSpacedata = spacedataValues.reduce((acc, value) => acc + value, 0) / spacedataValues.length;
        const timedataValues = datas.map(item => item.timedata);
        const averageTimedata = timedataValues.reduce((acc, value) => acc + value, 0) / timedataValues.length;
        const eventdataValues = datas.map(item => Object.values(item.eventdata).filter(value => value === true).length);
        const averageEventdata = eventdataValues.reduce((acc, value) => acc + value, 0) / eventdataValues.length;


        return(
            {
                space : averageSpacedata.toFixed(2),
                time : averageTimedata,
                event : averageEventdata,
            }
        )
    };

// 결과값 아래에 나오는 개인의 정보
    const resultProfile = datas.map((item, index) => {
        const trueCount = Object.values(item.eventdata).filter(value => value === true).length;
        console.log(datas)
        return(
            <ResultProfile
                Id={item.id}
                Space={item.spacedata}
                Time={item.timedata}
                Event={trueCount}
            />
        )    
    })

// 시간별 동선과 겹치는 정도 아래에 나오는 라디오 프로필 버튼
    const idProfile = datas.map((item, index) => {
        return(
            <IdProfile
                id={item.id}
                key={index}
                state={ids[index].active}
                onClick={() => changeId(index)}
                visible={ids[index].active}
            />
        )
    })
 

    return (
        <div className={styles.result}>
            <div className={styles.Fixedarea}>
                <h1>결과 값</h1>
                <div className={styles.Resultnumber}>
                    <div>
                        <h2>{resultAll().space}%</h2>
                        <p>전체 공간 탐색 비율</p>
                    </div>
                    <div>
                        <h2>{resultAll().time}초</h2>
                        <p>평균 공간 체류 시간</p>
                    </div>
                    <div>
                        <h2>{resultAll().event}개</h2>
                        <p>중요 이벤트와 상호작용X</p>
                    </div>
                </div>

                <h1>참여자 기록</h1>
                <div className={styles.resultProfileWrap}>
                    <ResultProfile/>
                    {resultProfile}
                </div>
            </div>

            { props.tab == 'space' ? <div className={styles.Movearea}>
                <div className={styles.foot_traffic}>
                    <h1>시간별 동선과 겹치는 정도</h1>
                        <div className={styles.idProfileWrap}>
                            {idProfile}
                        </div>
                    <Img>
                        <div className={styles.Drawing_circle}>
                            <Map className={styles.svg} height={442}></Map>
                            {Line_Lists}
                            {Box_Lists}
                            {Circle_Lists}
                        </div>
                    </Img>
                </div>
                <div className={styles.flex_box}>
                    <div className={styles.foot_traffic2}>
                        <h1>구역별 개요</h1>
                        <div>
                            {Section_Card_List}
                        </div>
                    </div>
                    <div className={styles.zone}>
                        <h1>Map</h1>
                        <Img>
                            <Map_section
                                width={337}
                                height={860}
                            ></Map_section>
                        </Img>
                    </div>
                </div>
            </div> : null
            }

            {props.tab == 'box' ?<div className={styles.Movearea}>
                <div className={styles.foot_traffic}></div>
                <div className={styles.flex_box}>
                <div className={`${styles.foot_traffic2} ${styles.foot_traffic3}`}>
                        <h1>구역별 개요</h1>
                        <div>
                            {Section_Card_List2}
                        </div>
                    </div>
                    <div className={styles.zone}>
                        <h1>Map</h1>
                        <Img>
                            <Map_section_box
                                width={337}
                                height={860}
                            ></Map_section_box>
                        </Img>
                    </div>
                </div>
            </div> : null
            }
            
            {props.tab == 'people' ?<div className={styles.Movearea}>
                <div className={`${styles.flex_box} ${styles.Vertical}`}>
                <div className={`${styles.foot_traffic2} ${styles.foot_traffic3}`}>
                        <h1>사용자 대화 유무</h1>
                        <Img>
                            <Map_section_people
                                width={1220}
                                height={460}
                            ></Map_section_people>
                        </Img>
                    </div>
                    <div className={styles.zone}>
                        <h1>대화별 사용자 순위</h1>
                        <div className={styles.poepleRank}>
                            <div><Img><Profile></Profile></Img>#11314151</div>
                            <div><Img><Profile></Profile></Img>#11041123</div>
                        </div>
                    </div>
                </div>
            </div> : null
            }

        </div>
    );
}