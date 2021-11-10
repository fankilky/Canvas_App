class DrawingEmoji extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord) {
        this.contextReal.drawImage(
            styleGuide.emojiSource, //source
            coord[0] - styleGuide.emojiLength / 2, // coord x
            coord[1] - styleGuide.emojiLength / 2, // coord y
            styleGuide.emojiLength, // width
            styleGuide.emojiLength // height
        );
    }

    onMouseMove(coord) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.drawImage(
            styleGuide.emojiSource,
            coord[0] - styleGuide.emojiLength / 2,
            coord[1] - styleGuide.emojiLength / 2,
            styleGuide.emojiLength,
            styleGuide.emojiLength
        );
    }

    onDragging(coord) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    }
    onMouseUp() {
        beforeDraw();
    }
    onMouseLeave(coord) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    }
    onMouseEnter(coord) {}
}