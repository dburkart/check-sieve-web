var initialized = false;
var editor = document.getElementById("editor");
var toolbar = document.getElementById("toolbar");

var Module = {
    onRuntimeInitialized: function() {
        initialized = true;

        if (editor.value == "") {
            var body = document.getElementsByTagName("body")[0];
            var popover = document.createElement("div");
            popover.classList.add("popover");
            popover.classList.add("notice");
            popover.textContent = "Paste your mail sieve here to get started!";

            body.appendChild(popover);

            popover.style.top = "50%";
            popover.style.left = "calc(50% - " + (popover.offsetWidth / 2) + "px)";
        }
    }
}

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

var checkSyntax = function() {
    var result = Module.sieve_parse_string(editor.value, new Module.parse_options());

    if (result.status == 1) {
        console.log(result.location);
        // Get the offending gutter start line
        //var gutterLine = document.getElementById("ln-" + result.location.begin.line);
        //gutterLine.style.backgroundColor = "red";
        var line = 3.2 + result.location.begin.line;
        var column = 2.5 + result.location.begin.column;

        var popover = document.createElement("div");
        popover.classList.add("popover");
        popover.classList.add("error");
        popover.textContent = result.error;
        document.getElementsByTagName("body")[0].appendChild(popover);

        var lineY =   (popover.offsetHeight * (result.location.begin.line)) + toolbar.offsetHeight;

        popover.style.left = column.toString() + "ch";
        popover.style.top = lineY + "px";
    } else {
        var popover = document.createElement("div");
        popover.classList.add("popover");
        popover.classList.add("success");
        popover.style.textAlign = "center";
        popover.style.zIndex = "0";
        popover.style.display = "inline-block";
        popover.style.position = "relative";
        popover.style.padding = ".3rem";
        popover.textContent = "Sieve looks good!";
        toolbar.appendChild(popover);

        setTimeout(function() {
            var fadeEffect = setInterval(function() {
                if (!popover.style.opacity) {
                    popover.style.opacity = 1;
                }
                if (popover.style.opacity > 0) {
                    popover.style.opacity -= 0.1;
                } else {
                    clearInterval(fadeEffect);
                    toolbar.removeChild(popover);
                }
            }, 50)
        }, 3000);
    }
}

editor.addEventListener("input", function() {
    var body = document.getElementsByTagName("body")[0];
    var popovers = document.getElementsByClassName("popover");
    if (popovers.length) {
        for (p in popovers) {
            body.removeChild(popovers[p]);
        }
    }
})

var gutter = new Gutter();
