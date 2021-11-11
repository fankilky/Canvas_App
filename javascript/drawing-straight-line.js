class DrawingStraightLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.escape = false;
    }

    onMouseDown(coord, styleGuide, event) {
        setCanvasToStyleGuide(1);
        this.origX = coord[0];
        this.origY = coord[1];
        this.escape = false;
    }

    onDragging(coord, styleGuide, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.checkAndDraw(coord, this.contextDraft);
        this.escape = false;
    }

    onMouseUp(coord, styleGuide, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.checkAndDraw(coord, this.contextReal);
        saveStroke();
        this.escape = false;
    }

    onMouseMove() {}
    onMouseLeave() {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.escape = true;
    }
    onMouseEnter() {}

    checkAndDraw(coord, context) {
        if (!(this.escape)) {
            if (keyListeners.shift == true) {
                if (Math.abs(this.origX - coord[0]) > Math.abs(this.origY - coord[1])) {
                    this.drawLine(this.origX, this.origY, coord[0], this.origY, context);
                } else {
                    this.drawLine(this.origX, this.origY, this.origX, coord[1], context);
                }
            } else {
                this.drawLine(this.origX, this.origY, coord[0], coord[1], context);
            }
        }
    }

    drawLine(x1, y1, x2, y2, context) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
}