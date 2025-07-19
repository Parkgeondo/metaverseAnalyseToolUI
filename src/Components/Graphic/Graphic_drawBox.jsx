import React, { useRef, useEffect, useState } from "react";
import styles from "./Graphic.module.css";

export default function Graphic_drawBox(props) {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const [pos, setPos] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

useEffect(() => {
  const canvas = canvasRef.current;
  if (canvas) {
    setCtx(canvas.getContext("2d"));
  }
  if(ctx) {
    viewAll()
  }
}, [canvasRef.current]);

function drawSquare(e) {
  if (!isDraw) return;
  ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  viewAll(e);
  ctx.strokeStyle = props.color;
  ctx.lineWidth = 3;
  let currentX = e.clientX - canvasRef.current.offsetLeft - 380;
  let currentY = e.clientY - canvasRef.current.offsetTop - 60;
  
  // 투명도 설정
  ctx.globalAlpha = 0.2;

  // 채우기 스타일 및 도형 그리기
  ctx.fillStyle = props.color;
  ctx.fillRect(pos[0], pos[1], currentX - pos[0], currentY - pos[1]);
  
  // 투명도 원래대로 복원
  ctx.globalAlpha = 1;

    // 테두리 그리기
    ctx.strokeRect(pos[0], pos[1], currentX - pos[0], currentY - pos[1]);
}

  function drawStart(e) {
    setIsDraw(true);
    setPos([e.clientX - canvasRef.current.offsetLeft - 380, e.clientY - canvasRef.current.offsetTop -60]);
  }
  
  function drawEnd(e) {
    setIsDraw(false);
    let currentX = e.clientX - canvasRef.current.offsetLeft - 380;
    let currentY = e.clientY - canvasRef.current.offsetTop - 60;
    props.setPos2([pos[0], pos[1], currentX, currentY]);
  }

  useEffect(() => {
    if (props.view) {
      // "view"가 true일 때 "view all" 함수 실행
      // viewAll();
    }else if(!props.view){
      // clearAll();
    }
  }, [props.view]); // props.view가 변경될 때마다 실행

  function viewAll(e) {
    props.boxCoordinate.map(boxCoordinate => {
      ctx.strokeStyle = boxCoordinate.color;
      ctx.lineWidth = 3;
      ctx.strokeRect(boxCoordinate.coordinate[0], boxCoordinate.coordinate[1], boxCoordinate.coordinate[2] - boxCoordinate.coordinate[0], boxCoordinate.coordinate[3] - boxCoordinate.coordinate[1]);
    })
  }
  
  function clearAll(e) {

  }

  // canvasPosition_disable
  return (
    <>
      <div className={`${styles.canvasPosition} ${props.inputtext == 'none' ? styles.canvasPosition_disable : ''}`}>
        <canvas ref={canvasRef} width={290} height={780}
          onMouseDown={drawStart} 
          onMouseMove={drawSquare} 
          onMouseUp={drawEnd}
        />
      </div>
    </>
  );
}
