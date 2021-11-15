/**********************************************
 * Eraser Functionality
 * ==================================
 * This class extends the PaintFunction class, which you can find in canvas-common
 * Remember, order matters
 ***********************************************/
class Eraser extends PaintFunction {
  // This class extends the PaintFunction class
  // You are only passing one instance here

  constructor(contextReal) {
    super();
    this.context = contextReal;
  }

  // On mouse down, ensure that the pen has these features
  onMouseDown(coord, event) {
    this.context.lineWidth = styleGuide.penWidth; //only penWidth can be changed
    this.context.beginPath();
    this.context.moveTo(coord[0], coord[1]);
  }
  // Clicking and removing your mouse
  onDragging(coord, event) {
    this.context.globalCompositeOperation = "destination-out";
    this.draw(coord[0], coord[1]);
  }

  onMouseMove() {}
  onMouseUp() {
    saveStroke();
  }
  onMouseLeave() {
    this.context.globalCompositeOperation = "source-over";
  }
  onMouseEnter() {}

  draw(x, y) {
    //
    this.context.lineTo(x, y);
    // Draw the line onto the page
    this.context.stroke();
  }
}
