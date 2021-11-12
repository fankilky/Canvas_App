class TextBox extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
    this.newBox = false;
    this.addText = document.createElement("input");
  }

  onMouseDown(coord, event) {
    setCanvasToStyleGuide();
    this.origX = coord[0];
    this.origY = coord[1];
    this.contextReal.font = `${styleGuide.textSize * 1.3}px ${styleGuide.font}`;
    this.contextReal.fillStyle = styleGuide.fillColor;

    let x = this.origX;
    let y = this.origY;
    // Creating New Textbox
    if (this.newBox == false) {
      this.newBox = true;
      // let addText = document.createElement('input')
      this.addText.type = "text";
      this.addText.style.position = "fixed";
      this.addText.style.backgroundColor = "rgba(0,0,0,0.2)";
      this.addText.style.color = styleGuide.fillColor;
      this.addText.style.height = `50px`;
      this.addText.style.width = `${(350 * styleGuide.textSize) / 20}px`;
      this.addText.addEventListener("focus", (event) => {
        event.target.style.background = "rgba(255, 216, 0, 0.1)";
        event.target.style.outline = "2px solid #111111";
      });
      this.addText.style.font = styleGuide.font;
      this.addText.style.fontSize = `${styleGuide.textSize * 1.3}px`;
      this.addText.placeholder = "Press 'Enter' after typing text.";
      this.addText.style.left = event.clientX + "px"; //the position of this.addText when you click mouse//
      this.addText.style.top = event.clientY + "px";
      this.addText.id = "textBox";
      document.body.appendChild(this.addText);

      setTimeout(() => {
        $("#textBox").focus();
      }, 0);
    }
    //Confirm adding textbox

    if (this.newBox == true) {
      document.getElementById("textBox").onkeydown = function confirmAdd(
        input
      ) {
        if (input.key == "Enter") {
          this.typed = document.getElementById("textBox").value;
          this.newBox = false;
          console.log(this);

          //Add Date
          if (this.typed == "#date") {
            let contextRealCopy = document
              .getElementById("canvas-real")
              .getContext("2d");
            let dateString = `${new Date().toLocaleDateString()}`;
            contextRealCopy.font = `${styleGuide.textSize * 2}px ${
              styleGuide.font
            }`;
            contextRealCopy.fillStyle = "rgba(0,0,0,0.2)";
            contextRealCopy.fillRect(
              x - styleGuide.textSize,
              y - styleGuide.textSize * 2.5,
              contextRealCopy.measureText(dateString).width +
                styleGuide.textSize * 2,
              styleGuide.textSize * 4,
              contextRealCopy
            );
            contextRealCopy.fillStyle = "rgba(255,255,255,0.8)";
            contextRealCopy.textAlign = "start";
            contextRealCopy.fillText(
              `${new Date().toLocaleDateString()}`,
              x,
              y
            );
            document.body.removeChild(this);
            saveStroke();
            this.newBox = false;
          } else if (this.typed == "#time") {
            //Add Time
            let contextRealCopy = document
              .getElementById("canvas-real")
              .getContext("2d");
            let dateString = `${new Date().toLocaleTimeString()}`;
            contextRealCopy.font = `${styleGuide.textSize * 2}px ${
              styleGuide.font
            }`;
            contextRealCopy.fillStyle = "rgba(0,0,0,0.2)";
            contextRealCopy.fillRect(
              x - styleGuide.textSize,
              y - styleGuide.textSize * 2.5,
              contextRealCopy.measureText(dateString).width +
                styleGuide.textSize * 2,
              styleGuide.textSize * 4,
              contextRealCopy
            );
            contextRealCopy.fillStyle = "rgba(255,255,255,0.8)";
            contextRealCopy.textAlign = "start";
            contextRealCopy.fillText(
              `${new Date().toLocaleTimeString()}`,
              x,
              y
            );
            document.body.removeChild(this);
            saveStroke();
            this.newBox = false;
          } else {
            contextReal.fillText(this.typed, coord[0], coord[1]);
            document.body.removeChild(this);
            // fontBoxCounter = false;
            saveStroke();
            this.newBox = false;
          }
        }
      };
    }
  }

  onDragging() {}

  onMouseMove() {}

  // Committing the element to the canvas
  onMouseUp() {}
  onMouseLeave(coord) {
    if (
      coord[0] < this.origX + 300 &&
      coord[0] > this.origX - 300 &&
      coord[1] < this.origY + 40 &&
      coord[1] > this.origY - 40
    ) {
    } else {
      $("#textBox").remove();
      this.newboX = false;
    }
  }
  onMouseEnter() {}
}
