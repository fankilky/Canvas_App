/**********************************************
 * The Canvas
 * ==================================
 ***********************************************/

let canvasReal = document.getElementById("canvas-real");
let contextReal = canvasReal.getContext("2d");
let canvasDraft = document.getElementById("canvas-draft");
let contextDraft = canvasDraft.getContext("2d");
let currentFunction;
let dragging = false;

contextReal.fillStyle = "white";
contextReal.fillRect(0, 0, canvasReal.width, canvasReal.height);

let styleGuide = {
    drawColor: "rgb(0,0,0)",
    fillColor: "rgb(0,200,255)",
    penWidth: 10,
    dashed: [],
    lineCap: "round", // for dashes, put in the distance, for none make array empty
    lineJoin: "miter",
    backgroundColor: "white",
    textSize: 20,
    font: "Arial",
};

let keyListeners = {
    shift: false,
    cmdC: false,
    cmdX: false,
    cmdV: false,
    cmdZ: false,
    cmdSftZ: false,
};

$("#canvas-draft").mousedown(function(e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseDown([mouseX, mouseY], e);
    dragging = true;
});

$("#canvas-draft").mousemove(function(e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    if (dragging) {
        currentFunction.onDragging([mouseX, mouseY], e);
    }
    currentFunction.onMouseMove([mouseX, mouseY], e);
});

$("#canvas-draft").mouseup(function(e) {
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseUp([mouseX, mouseY], e);
});

$("#canvas-draft").mouseleave(function(e) {
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseLeave([mouseX, mouseY], e);
});

$("#canvas-draft").mouseenter(function(e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseEnter([mouseX, mouseY], e);
});

/** # Class (all classes will have these methods) #
/*  ====================== */
class PaintFunction {
    constructor() {}
    onMouseDown() {}
    onDragging() {}
    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}
}

function setCanvasToStyleGuide() {
    // contextReal.restore();
    // contextDraft.restore();
    contextReal.strokeStyle = contextDraft.strokeStyle = styleGuide.drawColor;
    // if (styleGuide.fillColor != 'rgba(0, 0, 0, 0)') {
    //     contextReal.lineWidth = contextDraft.lineWidth = styleGuide.penWidth * multiplier;
    // } else {
    contextReal.lineWidth = contextDraft.lineWidth = styleGuide.penWidth;
    // }
    contextReal.fillStyle = contextDraft.fillStyle = styleGuide.fillColor;
    contextReal.setLineDash(styleGuide.dashed);
    contextDraft.setLineDash(styleGuide.dashed);
    contextReal.lineCap = contextDraft.lineCap = styleGuide.lineCap;
}

//Key Listeners (List at pagetop)
$(document).keydown((e) => {
    if (e.key == "Shift") {
        keyListeners.shift = true;
    }
});

$(document).keyup((e) => {
    if (e.key == "Shift") {
        keyListeners.shift = false;
    }
});

// Document Ctrl  C/X/V/Z
let ctrlDown = false,
    ctrlKey = 17,
    cmdKey = 91,
    shiftKey = 16,
    vKey = 86,
    cKey = 67,
    xKey = 88,
    zKey = 90;

$(document)
    .keydown(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    })
    .keyup(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
    });

$(document).keydown(function(e) {
    if (ctrlDown && e.keyCode == cKey) {
        keyListeners.cmdC = true;
    }
    if (ctrlDown && e.keyCode == xKey) {
        keyListeners.cmdX = true;
    }
    if (ctrlDown && e.keyCode == vKey) {
        keyListeners.cmdV = true;
    }
    if (ctrlDown && keyListeners.shift == false && e.keyCode == zKey) {
        keyListeners.cmdZ = true;
    }
    if (ctrlDown && keyListeners.shift == true && e.keyCode == zKey) {
        keyListeners.cmdSftZ = true;
    }
});
$(document).keydown(function(e) {
    if (!(ctrlDown && e.keyCode == cKey)) {
        keyListeners.cmdC = false;
    }
    if (!(ctrlDown && e.keyCode == xKey)) {
        keyListeners.cmdX = false;
    }
    if (!(ctrlDown && e.keyCode == vKey)) {
        keyListeners.cmdV = false;
    }
    if (!(ctrlDown && keyListeners.shift == false && e.keyCode == zKey)) {
        keyListeners.cmdZ = false;
    }
    if (!(ctrlDown && keyListeners.shift == true && e.keyCode == zKey)) {
        keyListeners.cmdSftZ = false;
    }
});
$(document).keyup(function(e) {
    if (!(ctrlDown && e.keyCode == cKey)) {
        keyListeners.cmdC = false;
    }
    if (!(ctrlDown && e.keyCode == xKey)) {
        keyListeners.cmdX = false;
    }
    if (!(ctrlDown && e.keyCode == vKey)) {
        keyListeners.cmdV = false;
    }
    if (!(ctrlDown && keyListeners.shift == false && e.keyCode == zKey)) {
        keyListeners.cmdZ = false;
    }
    if (!(ctrlDown && keyListeners.shift == true && e.keyCode == zKey)) {
        keyListeners.cmdSftZ = false;
    }
});