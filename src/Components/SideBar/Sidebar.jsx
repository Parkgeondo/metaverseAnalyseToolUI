import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { ReactComponent as Box } from "../Icons/box.svg";
import { ReactComponent as Checkcircle } from "../Icons/check-circle.svg";
import { ReactComponent as Gitbranch } from "../Icons/git-branch.svg";
import { ReactComponent as Helpcircle } from "../Icons/help-circle.svg";
import { ReactComponent as Map } from "../Icons/map.svg";
import { ReactComponent as Result } from "../Icons/result.svg";
import { ReactComponent as Play } from "../Icons/play.svg";

function Icons(props) {
  return <div className={styles.icons}>{props.children}</div>;
}

export default function Sidebar(props) {
  return (
    <div className={styles.Sidebar}>
      <Icons>
        <div
          className={styles.iconWrapper}
          onClick={() => props.handleIconClick("map")}
        >
          {props.selectedIcon === "map" ? <div className={styles.box}></div> : ""}
          <Map
            width={32}
            height={32}
            stroke={props.selectedIcon === "map" ? "#cecece" : "#5e616d"}
          />
        </div>
      </Icons>
      <Icons>
        <div
          className={styles.iconWrapper}
          onClick={() => props.handleIconClick("box")}
        >
          {props.selectedIcon === "box" ? <div className={styles.box}></div> : ""}
          <Box
            width={32}
            height={32}
            stroke={props.selectedIcon === "box" ? "#cecece" : "#5e616d"}
          />
        </div>
      </Icons>
      <Icons>
        <div
          className={styles.iconWrapper}
          onClick={() => props.handleIconClick("route")}
        >
          {props.selectedIcon === "route" ? (
            <div className={styles.box}></div>
          ) : (
            ""
          )}
          <Gitbranch
            width={32}
            height={32}
            stroke={props.selectedIcon === "route" ? "#cecece" : "#5e616d"}
          />
        </div>
      </Icons>
      <Icons>
        <div
          className={styles.iconWrapper}
          onClick={() => props.handleIconClick("play")}
        >
          {props.selectedIcon === "play" ? <div className={styles.box}></div> : ""}
          <Play
            width={32}
            height={32}
            stroke={props.selectedIcon === "play" ? "#cecece" : "#5e616d"}
          />
        </div>
      </Icons>
      <Icons>
        <div
          className={styles.iconWrapper}
          onClick={() => props.handleIconClick("result")}
        >
          {props.selectedIcon === "result" ? (
            <div className={styles.box}></div>
          ) : (
            ""
          )}
          <Result
            width={32}
            height={32}
            stroke={props.selectedIcon === "result" ? "#cecece" : "#5e616d"}
          />
        </div>
      </Icons>
      <Icons>
        <div
          className={styles.iconWrapper}
          onClick={() => props.handleIconClick("helpcircle")}
        >
          {props.selectedIcon === "helpcircle" ? (
            <div className={styles.box}></div>
          ) : (
            ""
          )}
          <Helpcircle
            width={32}
            height={32}
            stroke={props.selectedIcon === "helpcircle" ? "#cecece" : "#5e616d"}
          />
        </div>
      </Icons>
    </div>
  );
}
