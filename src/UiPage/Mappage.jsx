import React, { useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { OrthographicCamera } from "@react-three/drei";
import styles from "./Uipage.module.css";
//모델 불러오기 함수 + 회전 기능 추가
function Model(props) {
  const modelRef = useRef();
  const gltf = useGLTF('./metabus0403.glb');

  useFrame(() => {
    if (props.selectedIcon === "box" || props.selectedIcon === "route") {
      modelRef.current.rotation.y = 0;
      modelRef.current.position.y = 5;
      gltf.scene.scale.set(0.033, 0.033, 0.033);
    } else {
      modelRef.current.rotation.y += 0.002;
      modelRef.current.position.y = -1;
      gltf.scene.scale.set(0.04, 0.04, 0.04);
    }
    modelRef.current.position.x = 0;
    modelRef.current.position.z = -0.2;
  });


  return <primitive ref={modelRef} object={gltf.scene} />;
}

//카메라 위치 변경 함수
function MyCameraReactsToStateChanges() {
  const { camera } = useThree();
  let cameraPosition = new THREE.Vector3(0, 12, -1.5);
  let cameraRotation = new THREE.Euler(-1.52, 0, 0);

  useFrame(() => {
    camera.position.lerp(cameraPosition, 0.1);
    camera.rotation.copy(cameraRotation);
  });
}


export default function Mappage(props) {

  return (
    <div className={styles.map}>
      {props.fileName === "첨부파일을 넣어주세요." ? (
        <span>아직 맵이 없어요.</span>
      ) : (
        <Canvas camera={{ position: [0, 0, 5] }}>
          {props.selectedIcon == "box" || props.selectedIcon == "route" ? <OrthographicCamera makeDefault={true} position={[0, 0, 5]} zoom={100} /> : null}
          {props.selectedIcon == "box" || props.selectedIcon == "route" ?  <MyCameraReactsToStateChanges selectedIcon={props.selectedIcon}/> : null}
          <ambientLight intensity={3.5}/>
          <Model selectedIcon={props.selectedIcon}/>
          {props.selectedIcon == "box" || props.selectedIcon == "route" ?  null : <OrbitControls target={Model.position}/>}
        </Canvas>
      )}
    </div>
  );
}