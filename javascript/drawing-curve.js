class DrawingCurve extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.actionCounter = 0;
        this.newCurve = false;
    }

    onMouseDown(coord, event) {
        if (this.actionCounter === 0) {
            this.contextReal.lineCap = "round"; //lineCap = "butt" or "round"
            this.contextDraft.lineCap = "round"; //lineCap = "butt" or "round"
            setCanvasToStyleGuide();
            this.origX = coord[0];
            this.origY = coord[1];
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.origX, this.origY);
        } else if (this.actionCounter === 1) {}
    }
    onDragging(coord, event) {
        if (this.actionCounter === 0) {
            this.newCurve = true;
            this.endX = coord[0];
            this.endY = coord[1];
            this.contextDraft.closePath();
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.origX, this.origY);
            this.contextDraft.quadraticCurveTo(
                this.origX,
                this.origY,
                this.endX,
                this.endY
            );
            this.contextDraft.stroke();
        } else if (this.actionCounter === 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.origX, this.origY);
            this.contextDraft.quadraticCurveTo(
                coord[0],
                coord[1],
                this.endX,
                this.endY
            );
            this.contextDraft.stroke();
        }
    }
    onMouseUp(coord, event) {
        if (this.actionCounter === 0 && this.newCurve === true) {
            this.actionCounter = 1;
        } else if (this.actionCounter === 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextReal.quadraticCurveTo(
                coord[0],
                coord[1],
                this.endX,
                this.endY
            );
            this.contextReal.stroke();
            this.actionCounter = 0;
            saveStroke();
            this.newCurve = false;
        }
    }

    onMouseLeave() {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.newCurve = false;
        this.actionCounter = 0;
    }
}