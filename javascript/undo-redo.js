let ourCanvas = $("#canvas-real");
let undoStack = [];
let redoStack = [];

function saveStroke() {
    var lastMove = ourCanvas[0].toDataURL();
    undoStack.push(lastMove);
    redoStack = [];
}

$("#undo-button").click(undo);

function undo() {
    if (undoStack.length == 0) {
        return;
    } else if (undoStack.length == 1) {
        contextReal.fillStyle = "#ffffff";
        contextReal.fillRect(0, 0, canvasDraft.width, canvasDraft.height);
    } else if (undoStack.length > 1) {
        var prevImage = new Image();
        prevImage.src = undoStack[undoStack.length - 2];
        prevImage.onload = function() {
            contextReal.drawImage(prevImage, 0, 0);
        };
    }
    redoStack.push(undoStack.pop());
}

$("#redo-button").click(redo);

function redo() {
    if (redoStack.length == 0) {
        return;
    } else if (redoStack.length > 0) {
        var nextImage = new Image();
        contextReal.fillStyle = "#ffffff";
        contextReal.fillRect(0, 0, canvasDraft.width, canvasDraft.height);
        nextImage.src = redoStack[redoStack.length - 1];
        nextImage.onload = function() {
            contextReal.drawImage(nextImage, 0, 0);
        };
        undoStack.push(redoStack.pop());
    }
}

$(document).keydown(function(e) {
    if (keyListeners.cmdZ == true) {
        undo();
    }
    if (keyListeners.cmdSftZ == true) {
        redo();
    }
});