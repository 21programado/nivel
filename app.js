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

  if(Math.abs(beta) < 2 && Math.abs(gamma) < 2){
    statusText.textContent = "NIVELADO";
    statusText.style.color = "#00ff66";
  }else{
    statusText.textContent = `${beta.toFixed(1)}° / ${gamma.toFixed(1)}°`;
    statusText.style.color = "#ccc";
  }
}

function initSensors(){
  if (typeof DeviceOrientationEvent !== "undefined") {

    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", e => {
            moveBubble(e.beta || 0, e.gamma || 0);
          });
        } else {
          statusText.textContent = "Permiso denegado";
        }
      });
    } else {
      window.addEventListener("deviceorientation", e => {
        moveBubble(e.beta || 0, e.gamma || 0);
      });
    }

  } else {
    statusText.textContent = "Sensor no disponible";
  }
}

initSensors();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}