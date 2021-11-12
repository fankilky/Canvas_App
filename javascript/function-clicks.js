$(() => {
  // default function : line
  currentFunction = new DrawingLine(contextReal);
  $("#drawing-rectangle").click(() => {
    currentFunction = new DrawingRectangle(contextReal, contextDraft);
  });
  $("#drawing-circle").click(() => {
    currentFunction = new DrawingCircle(contextReal, contextDraft);
  });
  $("#drawing-line").click(() => {
    currentFunction = new DrawingLine(contextReal);
  });
  $("#eraser").click(() => {
    currentFunction = new Eraser(contextReal);
  });
  $("#drawing-emoji").click(() => {
    currentFunction = new DrawingEmoji(contextReal, contextDraft);
  });
  $("#selector-button").click(() => {
    currentFunction = new Selecting(contextReal, contextDraft);
  });
  $("#text").click(() => {
    currentFunction = new TextBox(contextReal, contextDraft);
  });
  $("#drawing-polygon").click(() => {
    currentFunction = new DrawingPolygon(contextReal, contextDraft);
  });
  $("#drawing-straight-line").click(() => {
    currentFunction = new DrawingStraightLine(contextReal, contextDraft);
  });
  $("#color-bucket").click(() => {
    currentFunction = new ColorBucket(contextReal);
  });
  $("#drawing-curve").click(() => {
    currentFunction = new DrawingCurve(contextReal, contextDraft);
  });
  $("#drawing-shadow-dots").click(() => {
    currentFunction = new DrawingShadowDots(contextReal);
  });
  // -------- Brush range --------
  $("#brush-range").change(function () {
    styleGuide.penWidth = $("#brush-range").val();
    console.log(styleGuide.dashed);
    // if (styleGuide.dashed != []) {
    //     styleGuide.dashed = [0, 2 * styleGuide.penWidth];
    // }
    console.log(styleGuide);
    $("#brush-size-number").html(styleGuide.penWidth);
  });
  // ------------ Clear ------------
  $("#clear-button").click(() => {
    contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
    saveStroke();
  });

  // ------------ Color Palette ------------
  let editOuter = true;

  function changeColour(newColour) {
    if (editOuter) {
      styleGuide.drawColor = newColour;
    } else {
      styleGuide.fillColor = newColour;
    }
  }
  $(".color-sq-small").click(function () {
    changeColour($(this).css("background-color"));
  });

  $("#palette").on("move.spectrum", function (e, tinycolor) {
    changeColour($(".sp-preview-inner").css("background-color"));
  });
  $("#palette").on("change.spectrum", function (e, tinycolor) {
    changeColour($(".sp-preview-inner").css("background-color"));
  });

  $(document).ready(function () {
    $("#palette").spectrum({
      showPalette: true,
      showSelectionPalette: true,
      showInput: true,
      showAlpha: true,
      palette: [],
    });
  });

  $("#outer").click(function () {
    editOuter = true;
  });
  $("#inner").click(function () {
    editOuter = false;
  });
});
