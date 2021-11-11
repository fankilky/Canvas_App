let minSideLength = 20;
// let poly_doubleClickLimit = 350;

class DrawingPolygon extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.sideNum = -1;
        this.coords = [];
    }

    onMouseDown(coord, event) {
        if (this.sideNum == -1) {
            this.coords = [];
            setCanvasToStyleGuide();
            // this.origX = coord[0];
            // this.origY = coord[1];
            this.origX = this.nextX = coord[0];
            this.origY = this.nextY = coord[1];
            console.log(this.origX)

        } else {
            this.drawLine(this.nextX, this.nextY, coord[0], coord[1], this.contextDraft);
        }
        this.sideNum++
            console.log(this.sideNum)
    }

    onDragging(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.drawLine(this.nextX, this.nextY, coord[0], coord[1], this.contextDraft);
    }

    onMouseUp(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.drawLine(this.nextX, this.nextY, coord[0], coord[1], this.contextReal);
        this.coords.push(coord);
        this.nextX = coord[0];
        this.nextY = coord[1];
        console.log(this.origX)

        // Check to see if the last line ended within min_range of the polygon's starting coordinates

        let sideLengthX = Math.abs(this.nextX - this.origX)
        let sideLengthY = Math.abs(this.nextY - this.origY)
        if (sideLengthX < minSideLength && sideLengthY < minSideLength && this.sideNum > 0) {
            this.drawLine(coord[0], coord[1], this.origX, this.origY, this.contextReal)
            let region = new Path2D();
            region.moveTo(this.origX, this.origY);
            for (var i = 0; i < this.coords.length; i++) {
                region.lineTo(this.coords[i][0], this.coords[i][1]);
            }
            setCanvasToStyleGuide();
            region.closePath();
            this.contextReal.fill(region);
            this.contextReal.stroke(region);
            saveStroke();
            this.sideNum = -1;
            this.coords = [];
            this.nextX = this.nextY = null;

        } else
            console.log(this.sideNum)
    }

    drawLine(x1, y1, x2, y2, context) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }

    onMouseLeave() {
        if (this.sideNum > 0) {
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.nextX, this.nextY);
            this.contextReal.lineTo(this.origX, this.origY);
            this.contextReal.stroke();
            let region = new Path2D();
            region.moveTo(this.origX, this.origY);
            for (var i = 0; i < this.coords.length; i++) {
                region.lineTo(this.coords[i][0], this.coords[i][1]);
            }
            setCanvasToStyleGuide();
            region.closePath();
            this.contextReal.fill(region);
            this.contextReal.stroke(region)
        }
        // this.contextReal.fillStyle = styleGuide.fillColor;
        // this.contextReal.fill();
        this.coords = [];
        this.sideNum = -1;
        this.origX = this.origY = this.nextX = this.nextY = null;
    }

    onMouseEnter() {}
    onMouseMove() {}

}