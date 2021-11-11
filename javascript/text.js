class TextBox extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        // this.escape = false;
    }

    onMouseDown(coord, event) {
        setCanvasToStyleGuide()
        this.origX = coord[0];
        this.origY = coord[1];
        // this.escape = false;
        // this.contextReal.font = `${styleGuide.textSize}px ${styleGuide.font}`;
        // this.contextReal.fillStyle = styleGuide.fillColor;
        // let addDate = document.createElement ocaleString()}`
        // addDate.type = 'text';
        // addDate.style.position = 'fixed';
        // addDate.style.backgroundColor = 'rgba(0,0,0,0.2)'
        // addDate.style.color = 'rgba(255,255,255,0.8)'
        // addDate.style.border = "2px red solid";
        // addDate.style.placeholder = 'Type please!';
        // addDate.style.height = 40;
        // addDate.style.width = 350;
        // addDate.style.font = styleGuide.font;
        // addDate.style.fontSize = `${styleGuide.textSize*3}px`
        // addDate.placeholder = "To add text, click here, type, and push 'Enter'";
        // addDate.style.left = (this.origX + 5) + 'px'; //the position of addDate when you click mouse//
        // addDate.style.top = (this.origY + 45) + 'px';
        // addDate.id = 'dateBox'
        // document.body.appendChild(addDate);
        let dateString = `${new Date().toLocaleString()}`
        this.contextReal.font = `${styleGuide.textSize*2}px ${styleGuide.font}`
        this.contextReal.fillStyle = 'rgba(0,0,0,0.2)'
        this.contextReal.fillRect(this.origX - styleGuide.textSize, this.origY - styleGuide.textSize * 2.5, this.contextReal.measureText(dateString).width + styleGuide.textSize * 2, styleGuide.textSize * 4, this.contextReal)
        this.contextReal.fillStyle = 'rgba(255,255,255,0.8)'
        this.contextReal.textAlign = 'start'
        this.contextReal.fillText(`${new Date().toLocaleString()}`, this.origX, this.origY);
        // document.body.removeChild(addDate);
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
        this.drawRectangle(this.origX, this.origY, coord[0], coord[1], this.contextDraft)
        this.escape = false;
    }

    onMouseMove() {}

    // Committing the element to the canvas
    onMouseUp() {
        saveStroke()
    }
    onMouseLeave() {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height)
        this.escape = true;
    }
    onMouseEnter() {}


    drawRectangle(x1, y1, x2, y2, context) {
        context.beginPath();
        context.rect(
            x1, y1, x2 - x1, y2 - y1
        );
        context.stroke();
        context.fill();
    }

}