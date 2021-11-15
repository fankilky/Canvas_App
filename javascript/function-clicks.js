$(() => {
    // default function : line
    currentFunction = new DrawingLine(contextReal);
    $("#drawing-rectangle").click(() => {
        currentFunction = new DrawingRectangle(contextReal, contextDraft);
        resetButtons();
        selectButton($("#drawing-rectangle"));
    });
    $("#drawing-circle").click(() => {
        currentFunction = new DrawingCircle(contextReal, contextDraft);
        resetButtons();
        selectButton($("#drawing-circle"));
    });
    $("#drawing-line").click(() => {
        currentFunction = new DrawingLine(contextReal);
        resetButtons();
        selectButton($("#drawing-line"));
    });
    $("#eraser").click(() => {
        currentFunction = new Eraser(contextReal);
        resetButtons();
        selectButton($("#eraser"));
    });

    $("#selector-button").click(() => {
        currentFunction = new Selecting(contextReal, contextDraft);
        resetButtons();
        selectButton($("#selector-button"));
    });
    $("#text").click(() => {
        currentFunction = new TextBox(contextReal, contextDraft);
        resetButtons();
        selectButton($("#text"));
    });
    $("#drawing-polygon").click(() => {
        currentFunction = new DrawingPolygon(contextReal, contextDraft);
        resetButtons();
        selectButton($("#drawing-polygon"));
    });
    $("#drawing-straight-line").click(() => {
        currentFunction = new DrawingStraightLine(contextReal, contextDraft);
        resetButtons();
        selectButton($("#drawing-straight-line"));
    });
    $("#color-bucket").click(() => {
        currentFunction = new ColorBucket(contextReal);
        resetButtons();
        selectButton($("#color-bucket"));
    });
    $("#drawing-curve").click(() => {
        currentFunction = new DrawingCurve(contextReal, contextDraft);
        resetButtons();
        selectButton($("#drawing-curve"));
    });
    $("#drawing-shadow-dots").click(() => {
        currentFunction = new DrawingShadowDots(contextReal);
        resetButtons();
        selectButton($("#drawing-shadow-dots"));
    });
    // -------- Font Size range --------
    $("#font-range").change(function() {
        styleGuide.textSize = $("#font-range").val();
        $("#font-size-number").html(styleGuide.textSize);
    });
    // -------- Brush range --------
    $("#brush-range").change(function() {
        styleGuide.penWidth = $("#brush-range").val();
        console.log(styleGuide.dashed);
        console.log(styleGuide);
        $("#brush-size-number").html(styleGuide.penWidth);
    });
    // ------------ Clear ------------
    $("#clear-button").click(() => {
        contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
        contextReal.fillStyle = "#ffffff";
        contextReal.fillRect(0, 0, canvasDraft.width, canvasDraft.height);
        saveStroke();
    });

    //------------------Download---------------
    $("#download").click(() => {
        let image = canvasReal.toDataURL();
        let tempLink = document.createElement("a");
        tempLink.download = "image.jpg";
        tempLink.href = image;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    });

    // ------------ Color Palette ------------

    let setPalette = function(paletteId, defaultCol) {
        $(`.palette`).on("move.spectrum", function(e, tinycolor) {
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
        $(document).ready(function() {
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


    //Change button color on click
    function resetButtons() {
        $(`.btn.raised`).css({ 'background-color': '#33a6cc' })
    }

    function selectButton(button) {
        button.css({ 'background-color': 'rgb(155, 255, 155)' })
    }

    $(function() {
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
// $("#outer").click(function() {
//     editOuter = true;
// });
// $("#inner").click(function() {
//     editOuter = false;
// });

// tooltip of buttons

// });