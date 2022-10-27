const canvas = document.querySelector("canvas");
const color = document.getElementById("color");
const fill = document.getElementById("fill");
const stroke = document.getElementById("stroke");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

ctx.lineWidth = 5;
let isPainting = false;
let isFilling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (isPainting) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!isPainting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        isPainting = true;
    }
}

function stopPainting() {
    isPainting = false;
    if(isFilling) {
        ctx.fill();
    }
}

function setColor(e) {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}

function setFill() {
    isFilling = true;
}

function setStroke() {
    isFilling = false;
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
color.addEventListener("change", setColor);
fill.addEventListener("click", setFill);
stroke.addEventListener("click", setStroke);