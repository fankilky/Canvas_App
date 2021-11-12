class ColorBucket extends PaintFunction {
  constructor(contextReal) {
    super();
    this.contextReal = contextReal;
    this.pixelStack = [];
    this.colorLayer = [];
  }
  onMouseDown(coord, styleGuide) {
    this.startX = coord[0];
    this.startY = coord[1];
    console.log(this.startX);
    this.pixelStack = [[this.startX, this.startY]];

    var colorLayer = this.contextReal.getImageData(
      0,
      0,
      canvasReal.width,
      canvasReal.height
    );
    console.log(colorLayer);

    while (pixelStack.length) {
      var newPos, x, y, pixelPos, reachLeft, reachRight;
      newPos = pixelStack.pop();
      x = newPos[0];
      y = newPos[1];

      pixelPos = (y * canvasReal.width + x) * 4;
      while (y-- >= 0 && matchStartColor(pixelPos)) {
        pixelPos -= canvasReal.width * 4;
      }
      pixelPos += canvasReal.width * 4;
      ++y;
      reachLeft = false;
      reachRight = false;
      while (y++ < canvasReal.height - 1 && matchStartColor(pixelPos)) {
        colorPixel(pixelPos);

        if (x > 0) {
          if (matchStartColor(pixelPos - 4)) {
            if (!reachLeft) {
              pixelStack.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (x < canvasReal.width - 1) {
          if (matchStartColor(pixelPos + 4)) {
            if (!reachRight) {
              pixelStack.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        pixelPos += canvasReal.width * 4;
      }
    }
    context.putImageData(colorLayer, 0, 0);

    function matchStartColor(pixelPos) {
      var r = colorLayer.data[pixelPos];
      var g = colorLayer.data[pixelPos + 1];
      var b = colorLayer.data[pixelPos + 2];
      var a = colorLayer.data[pixelPos + 3];

      return r == startR && g == startG && b == startB && a == startA;
    }

    function colorPixel(pixelPos) {
      colorLayer.data[pixelPos] = r;
      colorLayer.data[pixelPos + 1] = g;
      colorLayer.data[pixelPos + 2] = b;
      colorLayer.data[pixelPos + 3] = a;
    }
  }

  onMouseUp() {
    saveStroke();
  }
}
