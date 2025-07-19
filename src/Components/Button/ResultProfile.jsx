import React from "react";
import styles from "./Buttons.module.css";

export default function ResultProfile(props) {
  console.log(props.Time)

  return (
        <div>
            <ul>
                <li>{props.Id ? props.Id:'ID'}</li>
                <li>{props.Space !== undefined ? `${props.Space}%` : '전체 공간 탐색 비율'}</li>
                <li>{props.Time !== undefined ? `${props.Time}초` : '공간 체류 시간'}</li>
                <li>{props.Event !== undefined ? `${props.Event}개` : '상호작용한 이벤트'}</li>
            </ul>
        </div>
  );
}