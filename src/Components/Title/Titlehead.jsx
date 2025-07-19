import React from "react";
import styles from "./Title.module.css";
import Button from "../Button/Buttons";

export default function TitleHead(props) {

  return (
    <div className={styles.TitleHead}>
      <h1>{props.Title || "입력된 제목이 없습니다."}</h1>
      <span>{props.Content || "입력된 텍스트가 없습니다."}</span>
      {props.type == "buttontype" ? <Button selectedIcon={props.selectedIcon} onClick={() => {props.setInputText('text'); props.setView(false);}} /> : ""}
    </div>
  );
}
