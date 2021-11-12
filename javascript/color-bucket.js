class ColorBucket extends PaintFunction {
  constructor(contextReal) {
    super();
    this.contextReal = contextReal;
    this.pixelStack = [];
    this.colorLayer = [];
  }
  onMouseDown(coord, styleGuide) {
    // this.startX = coord[0];
    // this.startY = coord[1];
    this.pixelStack = [[coord[0], coord[1]]];
    // Store the rgba value in startrgba
    var startrgba = this.contextReal.getImageData(coord[0], coord[1], 1, 1);
    var startR = startrgba.data[0];
    var startG = startrgba.data[1];
    var startB = startrgba.data[2];
    var startA = startrgba.data[3];
    var pixelData = [startR, startG, startB, startA];

    // Store Canvas rgba value in colorlayer
    var colorLayer = this.contextReal.getImageData(
      0,
      0,
      canvasReal.width,
      canvasReal.height
    );
    console.log(colorLayer);

    var c = $(`.sp-preview-inner`).eq(1).css("background-color");
    console.log(c);
    var rgb = c
      .replace(/^(rgb|rgba)\(/, "")
      .replace(/\)$/, "")
      .replace(/\s/g, "")
      .split(",");

    for (var i in rgb) {
      console.log(rgb[i]);
    }
    let newRGB = rgb.map((a) => parseFloat(a));
    console.log(newRGB);
    let a = newRGB[3];
    if (a == undefined) {
      a = 255;
    } else {
      a = Math.round(a * 255);
    }
    var rgba = [newRGB[0], newRGB[1], newRGB[2], a];

    function colorPixel(pixelPos) {
      colorLayer.data[pixelPos] = newRGB[0];
      colorLayer.data[pixelPos + 1] = newRGB[1];
      colorLayer.data[pixelPos + 2] = newRGB[2];
      colorLayer.data[pixelPos + 3] = a;
    }

    if (JSON.stringify(rgba) !== JSON.stringify(pixelData)) {
      while (this.pixelStack.length) {
        var newPos, x, y, pixelPos, reachLeft, reachRight;
        newPos = this.pixelStack.pop();
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
                this.pixelStack.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }

          if (x < canvasReal.width - 1) {
            if (matchStartColor(pixelPos + 4)) {
              if (!reachRight) {
                this.pixelStack.push([x + 1, y]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }

          pixelPos += canvasReal.width * 4;
        }
      }
      this.contextReal.putImageData(colorLayer, 0, 0);

      function matchStartColor(pixelPos) {
        var r = colorLayer.data[pixelPos];
        var g = colorLayer.data[pixelPos + 1];
        var b = colorLayer.data[pixelPos + 2];
        var a = colorLayer.data[pixelPos + 3];

        return r == startR && g == startG && b == startB && a == startA;
      }
    }
  }

  onMouseUp() {
    saveStroke();
  }
}
