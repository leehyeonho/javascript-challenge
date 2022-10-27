const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const color = document.getElementById("color");
const fill = document.getElementById("fill");
const stroke = document.getElementById("stroke");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let paint_path = [];

function setColor(e) {
    ctx.strokeStyle = e.target.value;
}

function setFill(e) {
    
}

function drawRectangle(x, y, w, h, fill) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    if(fill !== "") {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    ctx.stroke();
}

function drawCircle(x, y, radius, startAngle, endAngle, antiClockwise, fill) {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, antiClockwise);
    ctx.closePath();
    if(fill !== "") {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    ctx.stroke();
}



function stopPainting() {
    if(painting) {
        painting = false;
    }
}

function startPainting(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        painting = true;
    }
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (painting) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleCanvasClick(e) {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint";
    link.click();
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", handleCanvasClick);
canvas.addEventListener("contextmenu", handleCM);
color.addEventListener("change", setColor);
fill.addEventListener("click", setFill);
stroke.addEventListener("click", setStroke);

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

//얼굴
drawCircle(300,100,70,0,2*Math.PI,false,"#000");

// 눈
drawCircle(270,80,15,Math.PI,0,false,"yellow");
drawCircle(330,80,15,Math.PI,0,false,"green");

// 입
drawCircle(300,100,40,0,Math.PI,false,"red");

// 몸통
drawRectangle(250,200,100,300, "#000");

//팔
drawRectangle(200,200,30,150, "#000");
drawRectangle(370,200,30,150, "#000");