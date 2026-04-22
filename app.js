const bubble = document.getElementById("bubble");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

function draw(xRaw, yRaw){

  const maxMove = 95;

  let x = xRaw * 6;
  let y = yRaw * 6;

  x = Math.max(-maxMove, Math.min(maxMove, x));
  y = Math.max(-maxMove, Math.min(maxMove, y));

  bubble.style.left = `calc(50% + ${x}px)`;
  bubble.style.top  = `calc(50% + ${y}px)`;

  statusText.textContent =
    `X:${xRaw.toFixed(2)} Y:${yRaw.toFixed(2)}`;
}

function startOrientation(){
  window.addEventListener("deviceorientation", e => {
    draw(e.gamma || 0, e.beta || 0);
  });
}

function startMotion(){
  window.addEventListener("devicemotion", e => {
    const acc = e.accelerationIncludingGravity;

    if(acc){
      draw(acc.x || 0, acc.y || 0);
    }
  });
}

async function activate(){

  try{

    if(typeof DeviceMotionEvent !== "undefined" &&
       typeof DeviceMotionEvent.requestPermission === "function"){
      const r = await DeviceMotionEvent.requestPermission();
      if(r === "granted") startMotion();
    } else {
      startMotion();
    }

    if(typeof DeviceOrientationEvent !== "undefined" &&
       typeof DeviceOrientationEvent.requestPermission === "function"){
      const r2 = await DeviceOrientationEvent.requestPermission();
      if(r2 === "granted") startOrientation();
    } else {
      startOrientation();
    }

    statusText.textContent = "Sensor activo";
    startBtn.style.display = "none";

  }catch(err){
    statusText.textContent = "Sin acceso a sensores";
  }
}

startBtn.addEventListener("click", activate);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
