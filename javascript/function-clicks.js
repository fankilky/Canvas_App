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
    currentFunction = new DrawingEmoji(contextReal);
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
  // -------- Font Size range --------
  $("#font-range").change(function () {
    styleGuide.textSize = $("#font-range").val();
    $("#font-size-number").html(styleGuide.textSize);
  });
  // -------- Brush range --------
  $("#brush-range").change(function () {
    styleGuide.penWidth = $("#brush-range").val();
    console.log(styleGuide.dashed);
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

  // ------------ Color Palette ------------
  // let editOuter = true;

  // function changeColour(newColour) {
  //     if (editOuter) {
  //         styleGuide.drawColor = newColour;
  //     } else {
  //         styleGuide.fillColor = newColour;
  //     }
  // }
  // $(".color-sq-small").click(function() {
  //     changeColour($(this).css("background-color"));
  // });

  let setPalette = function (paletteId, defaultCol) {
    $(`.palette`).on("move.spectrum", function (e, tinycolor) {
      console.log($(`.sp-preview-inner`).eq(0).css("background-color"));
      console.log($(`.sp-preview-inner`).eq(1).css("background-color"));
      styleGuide.drawColor = $(`.sp-preview-inner`)
        .eq(0)
        .css("background-color");
      styleGuide.fillColor = $(`.sp-preview-inner`)
        .eq(1)
        .css("background-color");
    });
    // $(`#${paletteId}`).on("change.spectrum", function(e, tinycolor) {
    //     styleGuide.fillColor = $(`#${paletteId} .sp-preview-inner`).css("background-color");
    // });
    $(document).ready(function () {
      $(`#${paletteId}`).spectrum({
        color: defaultCol,
        showPalette: true,
        showSelectionPalette: true,
        showInput: true,
        showAlpha: true,
        palette: [],
      });
    });
  };
  setPalette("paletteOuter", "rgb(0,0,0)");
  setPalette("paletteInner", "rgb(0,200,255)");

  // $("#outer").click(function() {
  //     editOuter = true;
  // });
  // $("#inner").click(function() {
  //     editOuter = false;
  // });

  // tooltip of buttons
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  // Help center hover
  $("#help-button").mouseenter(() => {
    $("#help-text").show();
  });

  $("#help-button").mouseleave(() => {
    $("#help-text").hide();
  });
});
