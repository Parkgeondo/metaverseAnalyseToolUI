let box2 = document.querySelector("#box2");
let npc = document.querySelector("#npc");
let float = document.querySelector(".float");
let compass = document.querySelector("#compass");
let logo3D = document.querySelector("#logo3D");
let image = document.querySelector("#image");
let image2 = document.querySelector("#image2");
let ent = false;
let mainimg = document.querySelector("#image3");
let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let map = document.querySelector("#map");
let cha = document.querySelector(".cha");
let miniMap = document.querySelector(".miniMap");

let intersection;
let clickPoint;

AFRAME.registerComponent("cursor-listener", {
  init: function () {
    this.el.addEventListener("raycaster-intersected", (evt) => {
      this.raycaster = evt.detail.el;

      this.el.addEventListener("click", (evt) => {
        clickPoint = $(
          `<a-box color="tomato" opacity="0.1" depth="0.4" height="0.4" width="0.4" position="${intersection.point.x} ${intersection.point.y} ${intersection.point.z}"></a-box>`
        );
        console.log(clickPoint);
        $(positionMap).append(clickPoint);
      });
    });

    this.el.addEventListener("raycaster-intersected-cleared", (evt) => {
      this.raycaster = null;
    });
  },
  tick: function () {
    if (!this.raycaster) {
      return;
    }
    intersection = this.raycaster.components.raycaster.getIntersection(this.el);
    if (!intersection) {
      return;
    }
  },
});

AFRAME.registerComponent("buttonnext", {
  init: function () {
    var lastIndex = -1;
    var COLORS = ["#my-image3", "#my-image4", "#my-image5"];
    this.el.addEventListener("click", function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;
      mainimg.setAttribute("src", COLORS[lastIndex]);
      //카운트수를 추가 이위치에 넣어야 각자 숫자 생성 가능
    });
  },
});
AFRAME.registerComponent("buttonback", {
  init: function () {
    var lastIndex = -1;
    var COLORS = ["#my-image3", "#my-image4", "#my-image5"];
    this.el.addEventListener("click", function (evt) {
      lastIndex = (lastIndex + 2) % COLORS.length;
      mainimg.setAttribute("src", COLORS[lastIndex]);
      //카운트수를 추가 이위치에 넣어야 각자 숫자 생성 가능
    });
  },
});

function FPP() {
  let cmloc = camera.object3D.position;

  cmloc.x = 0;
  cmloc.y = 2;
  cmloc.z = 0;

  mainimg.setAttribute("opacity", 1);
  btn1.setAttribute("opacity", 1);
  btn2.setAttribute("opacity", 1);
}
function TPP() {
  let cmloc = camera.object3D.position;
  btn1.setAttribute("opacity", 0);
  btn2.setAttribute("opacity", 0);
  mainimg.setAttribute("opacity", 0);
  cmloc.x = 0;
  cmloc.y = 2;
  cmloc.z = 8;
}

//캐릭터의 위치를 저장하는 함수를 담는 인터벌 함수
let positionInterval;

//전체 캐릭터의 위치를 담는 배열
let position = [];

//임시로 캐릭터의 위치를 받는 함수 나중에 배열에 하나씩 저장
let array;

function positionTracking() {
  positionInterval = setInterval(function () {
    array = rig.object3D.position;
    position.push(...array);
  }, 500);
}

//트레킹을 시작하거나 끝낼때 누르는 버튼
let start = document.querySelector(".start");
let end = document.querySelector(".end");

start.addEventListener("click", () => {
  positionTracking();
  console.log(position);
  alert("위치를 추척하겠습니다.");
});

end.addEventListener("click", () => {
  clearInterval(positionInterval);
  XYZarray();
});

let R = 0;
let intervalId = null;

function startCounting() {
  intervalId = setInterval(function () {
    R++;
    console.log("a:", R);
  }, 1000);
}

function stopCounting() {
  clearInterval(intervalId);
  R = 0;
  console.log("Counting stopped. a has been reset.");
}

// // distance가 10 이하일 때 counting 시작
// if (d <= 10) {
//   startCounting();
// }else{
//   stopCounting()
// }

//위치값을 받아온 배열들을 XYZ의 객체로 저장
let X = [];
let Y = [];
let Z = [];
let radius = 0.5;

function XYZarray() {
  for (let i = 0; i < position.length; i++) {
    switch (i % 3) {
      case 0:
        X.push(position[i]);
        break;
      case 1:
        Y.push(position[i]);
        break;
      case 2:
        Z.push(position[i]);
        break;
    }
  }

  let first = [];
  let standingTimes = [];
  let radius = 0.5;
  for (let i = 0; i < parseInt(position.length / 3); i++) {
    let car;
    if (X[i] !== undefined) {
      car = {
        X: `${X[i]}`,
        Y: `${Y[i]}`,
        Z: `${Z[i]}`,
      };
    }

    first.push(car);

    if (i != 0) {
      const a = new THREE.Vector3(
        first[i - 1].X,
        first[i - 1].Y,
        first[i - 1].Z
      );
      const b = new THREE.Vector3(first[i].X, first[i].Y, first[i].Z);
      const d = a.distanceTo(b).toFixed(1);

      console.log(d);

      if (d < 0.5) {
        radius = radius + 0.25;
        if (radius > 5.0) {
          radius = 5;
        }
      } else {
        radius = 0.5;
      }
    }

    let route;
    let route2;
    if (i != 0) {
      route = $(
        `<a-entity line="start: ${first[i - 1].X} ${first[i - 1].Y} ${
          first[i - 1].Z
        }; end: ${first[i].X} ${first[i].Y} ${
          first[i].Z
        }; color: red"></a-entity>`
      );
      // route2 = $(`<a-box color="tomato" depth="0.4" height="0.4" width="0.4" position="${first[i-1].X} ${first[i-1].Y} ${first[i-1].Z}"></a-box>`)
      // route2 = $(`<a-circle src="#platform" position="${first[i-1].X} ${first[i-1].Y} ${first[i-1].Z} radius="40" rotation="-90 0 0"></a-circle>`)
      route2 = $(
        `<a-circle position="${first[i - 1].X} ${first[i - 1].Y} ${
          first[i - 1].Z
        }" radius="${radius}" rotation="-90 0 0" material="color: red; transparent: true; opacity: 0.5" ></a-circle>`
      );
    }
    console.log(first);

    $(positionMap).append(route, route2);
  }

  // for(let i = 0; i < first.length; i++){
  //   if (i != 0) {
  //     console.log(first[i - 1], first[i])
  //   }
  // }

  let data = JSON.stringify(first);
  download(data, "data.json", "text/plain");
  console.log(data);
}

AFRAME.registerComponent("change-color-on-hover", {
  updateSchema: function () {
    var lastIndex = -1;
    var COLORS = ["red", "green", "blue"];
    this.el.addEventListener("click", function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute("material", "color", COLORS[lastIndex]);
      const clickXYZ = evt.detail.intersection.point;
    });
  },
});

let objs = [];
let obj = {};

AFRAME.registerComponent("raycaster-detected", {
  updateSchema: function () {
    this.el.addEventListener("click", function (evt) {
      let object = evt.detail.intersection.object.el.id;
      console.log(object);
    });
  },

  init: function () {
    // 이 객체의 아이디와, 거리, 방향을 담는 개체 생성
    obj = {
      id: this.el.id,
      distance: "",
      position: "",
      direction: "",
    };

    // 물체가 치킨, 쿠키, 피자라면 objs안에 objs={치킨 객체,쿠키 객체, 피자 객체}로 push
    objs.push(obj);
    console.log(objs);
  },

  tick: function () {
    let p = rig.object3D.position;
    let item = this.el.object3D.position;
    // 벡터를 통해 물체와 캐릭터의 거리를 구하는 변수
    const a = new THREE.Vector3(item.x, item.y, item.z);
    const b = new THREE.Vector3(p.x, p.y, p.z);
    const d = a.distanceTo(b).toFixed(1);

    // 각 아이템과의 각도를 구하는 뭐시깽
    let angle = Math.atan2(item.z - p.z, item.x - p.x);

    // objs의 array에 따라 제작을 해야됨 그래서 아예 obj[1]이런식으로 제작

    // 이 객체의 아이디와, 거리, 방향을 담는 개체 생성
    for (let i = 0; i < objs.length; i += 1) {
      if (objs[i].id == this.el.id) {
        (objs[i].distance = d),
          (objs[i].position = item),
          (objs[i].direction = angle);
      }
    }
    if (this.el.id == "box") {
      if (objs[2].distance < 8) {
        FPP();
        console.log("11");
      } else {
        TPP();
      }
    }

    if (this.el.id == "guide") {
      if (this.el.id == "logo") {
        compass.object3D.rotation.set(0, -(angle - 90 * (Math.PI / 180)), 0);
        compass.object3D.position.set(p.x, p.y + 1, p.z);
      }

      //노가다
      if (objs[1].distance > 16) {
        image.removeAttribute("animation__fadein");
        image.setAttribute("animation__fadeout", {
          property: "opacity",
          to: "0",
          from: "1",
          easing: "easeInOutCubic",
          dur: "100",
        });

        logo3D.removeAttribute("animation__002");
        logo3D.setAttribute("animation__003", {
          property: "position",
          to: { x: 0, y: 0, z: 0 },
          easing: "easeInOutCubic",
          dur: "100",
        });
        logo3D.setAttribute("animation__001", {
          property: "position",
          to: { x: 0, y: -2, z: 0 },
          from: { x: 0, y: 0, z: 0 },
          loop: true,
          dir: "alternate",
          easing: "easeInOutCubic",
          dur: "1000",
          startEvents: "animationcomplete__003",
        });
      } else if (objs[1].distance <= 16 && objs[1].distance >= 10) {
        image.removeAttribute("animation__fadeout");
        image.setAttribute("animation__fadein", {
          property: "opacity",
          to: "1",
          from: "0",
          easing: "easeInOutCubic",
          dur: "100",
        });
        console.log("33");

        image2.removeAttribute("animation__fadein");
        if (ent == true) {
          image2.setAttribute("animation__fadeout", {
            property: "opacity",
            to: "0",
            from: "1",
            easing: "easeInOutCubic",
            dur: "100",
          });
        }
        ent = false;

        logo3D.removeAttribute("animation__001");
        logo3D.removeAttribute("animation__003");
        logo3D.setAttribute("animation__002", {
          property: "position",
          to: { x: 0, y: 2, z: 0 },
          easing: "easeInOutCubic",
          dur: "300",
        });
      } else if (objs[1].distance < 10) {
        image2.removeAttribute("animation__fadeout");
        image2.setAttribute("animation__fadein", {
          property: "opacity",
          to: "1",
          from: "0",
          easing: "easeInOutCubic",
          dur: "100",
        });
        ent = true;
      }
    }
  },
});

// 활성화 카메라 변환

const firstCameraEl = document.querySelector("#camera");
const secondCameraEl = document.querySelector("#second-camera");
const cameraRig = document.querySelector("#cameraRig");

function change1() {
  //카메라1번 조작할 수 없도록 만듬
  secondCameraEl.setAttribute("look-controls", { enabled: false });

  //카메라 첫번째꺼 끄고 두번째 카메라 활성화
  firstCameraEl.setAttribute("camera", "active", false);
  secondCameraEl.setAttribute("camera", "active", true);

  //카메라가 원점을 볼 수 있도록 회전
  cameraRig.object3D.position.set(0, 20, 8);
  cameraRig.object3D.rotation.set(18, 0, 0);
  secondCameraEl.object3D.rotation.set(0, 0, 0);
}

function change2() {
  firstCameraEl.setAttribute("camera", "active", true);
  secondCameraEl.setAttribute("camera", "active", false);
}

let points = 0;
let curve = 0;
var camPosIndex = 0;

const planPath = [
  { x: 0, y: 0, z: -1 },
  { x: 0, y: 0, z: -4 },
  { x: 1, y: 0, z: -8 },
  { x: 5, y: 0, z: -9 },
];

let planMap = document.querySelector("#planMap");

//"some-line"속성을 가진 객체안에 곡선을 넣고 그 곡선을 따라서 움직일 수 있도록
AFRAME.registerComponent("some-line", {
  init: function () {
    let planRoute;
    let planRoute2;
    for (let i = 0; i < planPath.length; i++) {
      planRoute = $(
        `<a-box color="tomato" depth="0.4" height="0.4" width="0.4" position="${planPath[i].x} ${planPath[i].y} ${planPath[i].z}"></a-box>`
      );

      planRoute2 = $(
        `<a-entity line="start: ${planPath[i].x} ${planPath[i].y} ${
          planPath[i].z
        }; end: ${planPath[i + 1].x} ${planPath[i + 1].y} ${
          planPath[i + 1].z
        }; color: red"></a-entity>`
      );

      $(planMap).append(planRoute, planRoute2);
      console.log("asd");
    }
  },

  tick: function () {},
});

const load = [];
let time = Date.now();
let deltaTime = 0;
AFRAME.registerComponent("checkinteraction", {
  tick: function () {
    const newTime = Date.now();
    deltaTime = newTime - time;
  },
  updateSchema: function () {
    this.el.addEventListener("click", function (evt) {
      let clickObject = {
        object: evt.detail.intersection.object.el,
        time: deltaTime,
      };
      load.push(clickObject);
      // console.log(deltaTime)
      // console.log(load)
    });
  },
});

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function read(event) {
  event.preventDefault();
  let file = document.getElementById("input_file").files[0];

  console.log(file);

  let fr = new FileReader();

  fr.readAsText(file, "utf-8");

  fr.onload = function (e) {
    json = JSON.parse(e.target.result);
    console.log(json);
    let radius = 2;
    for (let i = 0; i < json.length; i++) {
      if (i != 0) {
        const a = new THREE.Vector3(
          json[i - 1].X,
          json[i - 1].Y,
          json[i - 1].Z
        );
        const b = new THREE.Vector3(json[i].X, json[i].Y, json[i].Z);
        const d = a.distanceTo(b).toFixed(1);

        console.log(d);

        if (d < 0.5) {
          radius = radius + 1;
          if (radius > 15.0) {
            radius = 5;
          }
        } else {
          radius = 0.5;
        }
      }

      let route3;
      let route4;

      if (i != 0) {
        route3 = $(
          `<a-entity line="start: ${json[i - 1].X} ${json[i - 1].Y} ${
            json[i - 1].Z
          }; end: ${json[i].X} ${json[i].Y} ${
            json[i].Z
          }; color: red"></a-entity>`
        );
        route4 = $(
          `<a-circle position="${json[i - 1].X} ${json[i - 1].Y} ${
            json[i - 1].Z
          }" radius="${radius}" rotation="-90 0 0" material="color: red; transparent: true; opacity: 0.5" ></a-circle>`
        );
      }
      $(positionMap).append(route3, route4);
    }
  };
  // $.getJSON(file,  function (data) {
  //     console.log(data)
  //   }
  // );
}

let ReadX = [];
let ReadY = [];
let ReadZ = [];
