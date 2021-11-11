//ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle[, counterclockwise]);


class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.escape = false;
    }

    onMouseDown(coord, event) {
        setCanvasToStyleGuide()
        this.origX = coord[0];
        this.origY = coord[1];
        this.escape = false;
    }

    onDragging(coord, event) {
        // Manipulating the context draft
        // Allows you to actually draw out your squares
        this.contextDraft.clearRect(
            0, 0, canvasDraft.width, canvasDraft.height
        );
        // Pass in the original x and y coordinates, followed by the new coordinates that we get for position x and y
        this.checkAndDraw(this.origX, this.origY, coord[0], coord[1], this.contextDraft)
        this.escape = false;
    }

    onMouseMove() {}

    // Committing the element to the canvas
    onMouseUp(coord) {

        // Clearing the rectangle first
        this.contextDraft.clearRect(
            0, 0, canvasDraft.width, canvasDraft.height
        );
        // Commit that drawing to context real
        // Without this commit, it won't actually draw
        this.checkAndDraw(this.origX, this.origY, coord[0], coord[1], this.contextReal);
        saveStroke();
        this.escape = false;
    }
    onMouseLeave() {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height)
        this.escape = true;
    }
    onMouseEnter() {}

    checkAndDraw(x1, y1, x2, y2, context) {
        if (!(this.escape)) {
            if (keyListeners.shift == false) {
                this.drawEllipse(x1, y1, x2, y2, context);
            } else {
                this.drawCircle(x1, y1, x2, y2, context);
            }
        }
    }

    drawCircle(x1, y1, x2, y2, context) {
        context.beginPath();
        context.arc(x1, y1, Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)), 0, Math.PI * 2);
        context.stroke();
        context.fill();
    }
    drawEllipse(x1, y1, x2, y2, context) {
        context.beginPath();
        context.ellipse(x1, y1, Math.abs(x1 - x2), Math.abs(y1 - y2), 0, 0, Math.PI * 2);
        context.stroke();
        context.fill();
    }
}