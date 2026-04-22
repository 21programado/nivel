const bubble = document.getElementById("bubble");
const statusText = document.getElementById("status");

function moveBubble(beta, gamma){

  const maxMove = 95;

  let x = gamma * 3;
  let y = beta * 3;

  x = Math.max(-maxMove, Math.min(maxMove, x));
  y = Math.max(-maxMove, Math.min(maxMove, y));

  bubble.style.left = `calc(50% + ${x}px)`;
  bubble.style.top  = `calc(50% + ${y}px)`;

  statusText.textContent =
    `β:${beta.toFixed(1)}° γ:${gamma.toFixed(1)}°`;

  if(Math.abs(beta) < 2 && Math.abs(gamma) < 2){
    statusText.style.color = "#00ff66";
  } else {
    statusText.style.color = "#ffffff";
  }
}

function startSensor(){
  window.addEventListener("deviceorientation", e => {
    moveBubble(e.beta || 0, e.gamma || 0);
  });
}

function init(){

  if (typeof DeviceOrientationEvent === "undefined") {
    statusText.textContent = "Sensor no disponible";
    return;
  }

  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then(state => {
        if(state === "granted"){
          startSensor();
        } else {
          statusText.textContent = "Permiso denegado";
        }
      })
      .catch(() => startSensor());
  } else {
    startSensor();
  }
}

init();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
