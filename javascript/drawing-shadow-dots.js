class DrawingShadowDots extends PaintFunction {
    constructor(contextReal) {
        super();
        this.contextReal = contextReal;
        this.rgbaColor = null
    }
    onMouseDown(coord, event) {
        setCanvasToStyleGuide()
            // Drawing the line here
        this.drawDot(coord[0], coord[1], this.contextReal)
    }

    // Clicking and removing your mouse
    onDragging() {}

    onMouseMove() {}
    onMouseUp() {
        saveStroke()
    }
    onMouseLeave() {}
    onMouseEnter() {}

    drawDot(x1, y1, context) {
        context.beginPath();
        context.arc(x1, y1, styleGuide.penWidth * 2, 0, Math.PI * 2);

        this.getColor(context.fillStyle)
        context.fillStyle = this.rgbaColor
        context.shadowColor = styleGuide.drawColor
        context.shadowBlur = styleGuide.penWidth
        context.fill();
        context.shadowColor = null
        context.shadowBlur = 0
    }

    getColor(color) {
        if (color.charAt(0) == '#') {
            this.rgbaColor = `rgba(${parseInt(color.charAt(1) + color.charAt(2), 16)},${parseInt(color.charAt(3) + color.charAt(4), 16)},${parseInt(color.charAt(5) + color.charAt(6), 16)},0.4)`
        } else { this.rgbaColor = color }
    }
}