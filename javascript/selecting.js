selectorDashLength = 6;
selectorLineColor = "black";
selectorLineWidth = 1;
minSizeNecessary = 3


class Selecting extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.finalX;
        this.finalY;
        this.objDraft = null;
        this.obj = null;
        this.objCopy = null;
        this.selectionMade = false;
        this.originalMove = false;
        this.dragCountAfterPaste = 0;
        this.imageDragging = false;
    };

    onMouseDown(coord, event) {

        if (this.selectionMade == false) {

            this.contextReal.setLineDash([selectorDashLength]);
            this.contextDraft.setLineDash([selectorDashLength]);
            this.contextReal.lineWidth = this.contextDraft.lineWidth = selectorLineWidth;
            this.origX = coord[0];
            this.origY = coord[1];
            this.dragCountAfterPaste = 0

        } else {

            this.adjustPoints();

            if ((coord[0] > this.origX) && (coord[0] < this.finalX) && (coord[1] > this.origY) && (coord[1] < this.finalY)) { //clicking the selected area


                if (this.originalMove == true) {
                    this.contextReal.fillStyle = 'white';
                    this.contextReal.fillRect(this.origX, this.origY, this.obj.width, this.obj.height);
                    this.originalMove = false;
                }
                this.putImage([this.objDraft, this.origX, this.origY], [this.obj, this.origX, this.origY]);
            } else {
                this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
                this.contextReal.putImageData(this.obj, this.origX, this.origY);
                this.origX = coord[0];
                this.origY = coord[1];
                this.selectionMade = false;
                this.objDraft = null;
                this.obj = null;
                this.originalMove = false;
            }
        }
    };


    onDragging(coord, event) {

        if (this.selectionMade == false) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.rect(this.origX, this.origY, coord[0] - this.origX, coord[1] - this.origY)
            this.contextDraft.stroke();

        } else {

            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.putImage([this.objDraft, coord[0] - this.objDraft.width / 2, coord[1] - this.objDraft.height / 2], [this.obj, coord[0] - this.obj.width / 2, coord[1] - this.obj.height / 2])
            this.imageDragging = true;
        }
    };

    onMouseUp(coord) {
        if (this.selectionMade == false) {
            this.finalX = coord[0];
            this.finalY = coord[1];

            // if (this.checkSize() == true) {
            this.getDraftImage(coord); // this.obj with the dashed border
            this.obj = this.contextReal.getImageData(this.origX, this.origY, this.finalX - this.origX, this.finalY - this.origY);
            this.selectionMade = true;
            this.originalMove = true;
            // } else this.selectionMade = false;
            this.dragCountAfterPaste = 0

        } else {

            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.putImage([this.objDraft, coord[0] - this.objDraft.width / 2, coord[1] - this.objDraft.height / 2], [this.obj, coord[0] - this.obj.width / 2, coord[1] - this.obj.height / 2])
            this.origX = coord[0] - this.obj.width / 2;
            this.origY = coord[1] - this.obj.height / 2;
            this.finalX = coord[0] + this.obj.width / 2;
            this.finalY = coord[1] + this.obj.height / 2;
            if (this.obj.width == this.objCopy.width) {
                this.dragCountAfterPaste++
            }
        }
    };

    onMouseMove(coord, e) {
        if (this.selectionMade == true) {
            e.target.style.cursor = 'move';
        } else {
            e.target.style.cursor = 'default';
        };
    };

    putImage(obj1, obj2) {
        this.contextDraft.putImageData(obj1[0], obj1[1], obj1[2]);
        this.contextDraft.putImageData(obj2[0], obj2[1], obj2[2]);
    };

    onMouseLeave(coord, e) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            if (this.imageDragging) {
                this.contextReal.putImageData(this.obj, this.origX, this.origY)
            }
            if (this.objDraft != null && this.originalMove == false) {
                saveStroke()
            }
            this.selectionMade = false;
            this.objDraft = null;
            this.obj = null;
            this.origX = null;
            this.origY = null;
            this.originalMove = false;
            this.dragCountAfterPaste = 0
            e.target.style.cursor = 'default'
        }
        // onMouseEnter() {}

    // checkCursorInSelection(coord) {
    //     let minX = Math.min(this.origX, this.finalX);
    //     let minY = Math.min(this.origY, this.finalY);

    //     if (coord[0] < (minX + Math.abs(this.origX - this.finalX)) && coord[0] >= minX &&
    //         coord[1] < (minY + Math.abs(this.origY - this.finalY)) && coord[1] >= minY) return true;
    //     else return false;
    // }

    // checkSize() {
    //     if (Math.abs(this.origX - this.finalX) > minSizeNecessary && Math.abs(this.origY - this.finalY) > minSizeNecessary) return true;
    //     else return false;
    // }

    getDraftImage(coord) {
        // this.objDraft = this.contextDraft.getImageData(this.origX, this.origY, this.origX - this.finalX, this.origY - this.finalY)

        if ((this.finalX < this.origX) && (this.finalY > this.origY)) { //extend 2px each direction to capture the dotted line
            this.objDraft = this.contextDraft.getImageData(this.origX + 2, this.origY - 2, coord[0] - this.origX - 4, coord[1] - this.origY + 4);
        } else if ((this.finalX < this.origX) && (this.finalY < this.origY)) {
            this.objDraft = this.contextDraft.getImageData(this.origX + 2, this.origY + 2, coord[0] - this.origX - 4, coord[1] - this.origY - 4);
        } else if ((this.finalX > this.origX) && (this.finalY < this.origY)) {
            this.objDraft = this.contextDraft.getImageData(this.origX - 2, this.origY + 2, coord[0] - this.origX + 4, coord[1] - this.origY - 4);
        } else {
            this.objDraft = this.contextDraft.getImageData(this.origX - 2, this.origY - 2, coord[0] - this.origX + 4, coord[1] - this.origY + 4);
        }
    }

    adjustPoints() {
        if ((this.finalX < this.origX) && (this.finalY > this.origY)) { //drag from right top

            this.origX -= this.obj.width;
            this.finalX += this.obj.width;

        } else if ((this.finalX < this.origX) && (this.finalY < this.origY)) { //drag from right bottom

            this.origX -= this.obj.width;
            this.origY -= this.obj.height;
            this.finalX += this.obj.width;
            this.finalY += this.obj.height;

        } else if ((this.finalX > this.origX) && (this.finalY < this.origY)) { //drag from left bottom

            this.origY -= this.obj.height;
            this.finalY += this.obj.height;

        };
    }

    // resetVariables() {
    //     this.selectionMade = false;
    //     this.obj = null;
    //     this.objDraft = null;
    //     this.finalX = null;
    //     this.finalY = null;
    //     this.origX = null;
    //     this.origY = null;
    //     this.originalMove = false;

    // }

    copySelect() {
        if (this.selectionMade == true) {

            this.adjustPoints()
            this.objCopy = new ImageData(($.extend(true, {}, this.obj).data), this.obj.width)
                // this.obj = null
                // this.selectionMade = false
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.rect(this.origX, this.origY, this.finalX - this.origX, this.finalY - this.origY);
            this.contextDraft.stroke();
        }
    }
    cutSelect() {
        if (this.selectionMade == true) {
            console.log(`hi`)

            this.adjustPoints()
            this.objCopy = new ImageData(($.extend(true, {}, this.obj).data), this.obj.width)
            this.obj = null
            this.selectionMade = false

            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.rect(this.origX, this.origY, this.finalX - this.origX, this.finalY - this.origY);
            this.contextDraft.stroke();
            this.contextReal.fillStyle = 'white';
            this.contextReal.fillRect(this.origX, this.origY, this.objCopy.width, this.objCopy.height);
            saveStroke()
        }
    }

    pasteSelect() {
        this.selectionMade = true
        if (this.dragCountAfterPaste > 0) {
            this.contextReal.putImageData(this.objCopy, this.origX, this.origY);
            this.dragCountAfterPaste = 0
        }
        this.obj = new ImageData(($.extend(true, {}, this.objCopy).data), this.objCopy.width)
        this.objDraft = new ImageData(($.extend(true, {}, this.objCopy).data), this.objCopy.width)
        this.contextDraft.putImageData(this.objCopy, 0, 0)
            // this.putImage([this.objCopyDraft, coord[0] - this.objCopyDraft.width / 2, coord[1] - this.objCopyDraft.height / 2], [this.objCopy, coord[0] - this.objCopy.width / 2, coord[1] - this.objCopy.height / 2])
        this.origX = 0;
        this.origY = 0;
        this.finalX = this.objCopy.width;
        this.finalY = this.objCopy.height;
        saveStroke()
    }
}

$(document).keydown(function(e) {
    if (keyListeners.cmdC == true) {
        currentFunction.copySelect()
    }
    if (keyListeners.cmdX == true) {
        currentFunction.cutSelect()
    }
    if (keyListeners.cmdV == true) {
        currentFunction.pasteSelect()
    }
});