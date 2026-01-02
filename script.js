const card = document.querySelector('.card');
card.addEventListener('click', () => card.classList.toggle('open'));

// ---------------- CONFETTI ----------------
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const confetti = Array.from({length:150}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height - canvas.height,
  r: Math.random()*6 +4,
  d: Math.random()*150,
  color: `hsl(${Math.random()*360},100%,75%)`,
  tilt: Math.random()*10-10,
  tiltAngleIncrement: Math.random()*0.07+0.05,
  tiltAngle: 0
}));

function drawConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetti.forEach(c=>{
    ctx.beginPath();
    ctx.lineWidth = c.r/2;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x+c.tilt+c.r/4,c.y);
    ctx.lineTo(c.x+c.tilt,c.y+c.tilt+c.r/2);
    ctx.stroke();
  });
  confetti.forEach((c,i)=>{
    c.tiltAngle += c.tiltAngleIncrement;
    c.y += (Math.cos(c.d)+3+c.r/2)/2;
    c.x += Math.sin(c.tiltAngle)*2;
    c.tilt = Math.sin(c.tiltAngle)*12;
    if(c.y>canvas.height){ confetti[i].y=-10; confetti[i].x=Math.random()*canvas.width; }
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

// ---------------- MUSIC VISUALIZER ----------------
const playBtn = document.getElementById('playPauseBtn');
const bars = document.querySelectorAll('.bar');
let playing=false;

playBtn.addEventListener('click', e=>{
  e.stopPropagation();
  playing=!playing;
  playBtn.textContent = playing ? '⏸ Pause' : '▶ Play';
});

function animateBars(){
  if(playing){
    bars.forEach(bar=>{
      bar.style.height = (10 + Math.random()*40)+'px';
      bar.style.background = `hsl(${Math.random()*360},100%,75%)`;
    });
  }
  requestAnimationFrame(animateBars);
}
animateBars();