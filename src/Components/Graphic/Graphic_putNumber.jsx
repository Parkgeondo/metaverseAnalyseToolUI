import React, { useRef, useEffect, useState } from "react";
import styles from "./Graphic.module.css";

export default function Graphic_putNumber(props) {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const [pos, setPos] = useState(false);

  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      setCtx(canvas.getContext("2d"));
    }
    if(ctx) {
      lineAll();
      viewAll();
    }
  }, [canvasRef.current]);

function drawCircle(e) {
  setIsDraw(true);
  lineAll();
  viewAll();
}

function moveCircle(e) {
  if (!isDraw) return;
    let currentX = e.clientX - canvasRef.current.offsetLeft - 380;
    let currentY = e.clientY - canvasRef.current.offsetTop - 60;
    let circle = new Circle(currentX, currentY,20, props.routeCoordinate.length + 1)
    circle.display();
    lineAll();
    viewAll();
}

function drawEnd(e) {
  setIsDraw(false);
  let currentX = e.clientX - canvasRef.current.offsetLeft - 380;
  let currentY = e.clientY - canvasRef.current.offsetTop - 60;
  props.setRoutePos([currentX, currentY]);
}

//현재 숫자아래에 선으로 잇기
function lineAll() {
  let prevCoordinate = [];
  if(!props.routeCoordinate.length == 0){
    props.routeCoordinate.map(routeCoordinate => {
      const currentX = routeCoordinate.x;
      const currentY = routeCoordinate.y;
      if(!prevCoordinate.length == 0){
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.moveTo(prevCoordinate[0], prevCoordinate[1]);
        ctx.lineTo(currentX,currentY);
        ctx.stroke();
        ctx.closePath();
      }
      prevCoordinate = [currentX, currentY];
    })
  }
}

//이전 숫자들 모두 보여주기
function viewAll(e) {
  props.routeCoordinate.map(routeCoordinate => {
    const currentX = routeCoordinate.x;
    const currentY = routeCoordinate.y;
    let circle= new Circle(currentX, currentY,20, routeCoordinate.id + 1)
    circle.setPrev();
  })
}

class Circle {
  constructor(x, y, r, id) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.id = id;
  }

  draw(){
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r / 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = '#23262F';
    ctx.fill();
    ctx.closePath();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center'; 
    ctx.fillText(this.id, this.x - this.r/100, this.y + this.r/5);
  }

  
//임시 숫자와 저장된 숫자 선으로 잇기
lineNow() {
  const prevPoint = props.routeCoordinate[props.routeCoordinate.length-1];
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 3;
  ctx.moveTo(prevPoint.x, prevPoint.y);
  ctx.lineTo(this.x,this.y);
  ctx.stroke();
  ctx.closePath();
}
  
  display() {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if(props.routeCoordinate.length){
      this.lineNow();
    }
    this.draw();
  }
  
  setPrev() {
    this.draw();
  }
}

  return (
    <>
      <div className={`${styles.canvasPosition} ${props.inputtext =='none' ? styles.canvasPosition_disable : ''}`}>
      <canvas ref={canvasRef} width={290} height={780}
        onMouseDown={drawCircle}
        onMouseMove={moveCircle}
        onMouseUp={drawEnd}
        />
      </div>
    </>
  );
}

// begin
