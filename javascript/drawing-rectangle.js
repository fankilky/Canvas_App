/**********************************************
 * Drawing Rectangle Functionality
 * ==================================
 * This class extends the PaintFunction class, which you can find in canvas-common
 ***********************************************/
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect

class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord, event) {
        setCanvasToStyleGuide()
        this.origX = coord[0];
        this.origY = coord[1];
    }

    onDragging(coord, event) {
        // Manipulating the context draft

        // Allows you to actually draw out your squares
        this.contextDraft.clearRect(
            0,
            0,
            canvasDraft.width,
            canvasDraft.height
        );
        // Pass in the original x and y coordinates, followed by the new coordinates that we get for position x and y
        this.contextDraft.beginPath()
        this.checkAndDraw(this.origX, this.origY, coord[0], coord[1], this.contextDraft)
        this.contextDraft.rect(
            this.origX,
            this.origY,
            coord[0] - this.origX,
            coord[1] - this.origY
        );
        this.contextDraft.stroke()
        this.contextDraft.fill();
    }

    onMouseMove() {}

    // Committing the element to the canvas
    onMouseUp(coord) {

        // Clearing the rectangle first
        this.contextDraft.clearRect(
            0,
            0,
            canvasDraft.width,
            canvasDraft.height
        );
        // Commit that drawing to context real
        // Without this commit, it won't actually draw
        this.contextReal.beginPath()
        this.checkAndDraw(this.origX, this.origY, coord[0], coord[1], this.contextReal)
        this.contextReal.rect(
            this.origX,
            this.origY,
            coord[0] - this.origX,
            coord[1] - this.origY
        );
        this.contextReal.stroke()
        this.contextReal.fill();
        saveStroke()
    }
    onMouseLeave() {}
    onMouseEnter() {}


    checkAndDraw(x1, y1, x2, y2, context) {
        if (keyListeners.shift) {
            this.drawSquare(x1, y1, x2, y2, context)
        } else {
            this.drawRectangle(x1, y1, x2, y2, context)
        }
    }
    drawRectangle(x1, y1, x2, y2, context) {
        context.beginPath();
        context.rect(
            x1, y1, x2 - x1, y2 - y1
        );
        context.stroke();
        context.fill();
    }
    drawSquare(x1, y1, x2, y2, context) {
        context.beginPath();
        let absWidth = Math.abs(x2 - x1)
        let absHeight = Math.abs(y2 - y1)
        if (x1 > x2 && y1 > y2) {
            context.rect(x1, y1, -Math.max(absWidth, absHeight), -Math.max(absWidth, absHeight))
        } else if (x1 < x2 && y1 < y2) {
            context.rect(x1, y1, Math.max(absWidth, absHeight), Math.max(absWidth, absHeight))
        } else if (x1 > x2 && y1 < y2) {
            context.rect(x1, y1, -Math.max(absWidth, absHeight), Math.max(absWidth, absHeight))
        } else if (x1 < x2 && y1 > y2) {
            context.rect(x1, y1, Math.max(absWidth, absHeight), -Math.max(absWidth, absHeight))
        }
        context.stroke();
        context.fill();

    }
}