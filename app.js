const bubble = document.getElementById("bubble");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

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
}

function startSensor(){

  window.addEventListener("deviceorientation", e => {
    moveBubble(e.beta || 0, e.gamma || 0);
  });

  statusText.textContent = "Sensor activo";
  startBtn.style.display = "none";
}

startBtn.addEventListener("click", () => {
  startSensor();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
