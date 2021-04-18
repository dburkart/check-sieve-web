class Gutter {
    constructor() {
        this.gutterDiv = document.getElementById("gutter");
        this.editorDiv = document.getElementById("editor");
        this.numLines = 0;

        var o = this;
        this.editorDiv.addEventListener("input", function() {
            o.update();
        });
        this.update(null);
    }

    gutterLine(number) {
        var line = document.createElement("div");
        line.textContent = number;
        line.id = "ln-" + number.toString();
        return line;
    }

    update(e) {
        var i = 1;

        for (var c in this.editorDiv.value) {
            if (this.editorDiv.value[c] == "\n") {
                i += 1;
            }
        }

        // More lines were added
        if (i > this.numLines) {
            var newLines = Array.from({length: i - this.numLines}, (x, ii) => ii + this.numLines + 1);
            for (var n in newLines) {
                this.gutterDiv.appendChild(this.gutterLine(newLines[n]));
            }
            this.numLines = i;
        }

        // Lines were removed
        if (i < this.numLines) {
            var removeLines = Array.from({length: this.numLines - i}, (x, ii) => this.numLines - ii);
            for (var n in removeLines) {
                var lineToRemove = document.getElementById("ln-" + removeLines[n].toString());
                this.gutterDiv.removeChild(lineToRemove);
            }
            this.numLines = i;
        }
    }
}
