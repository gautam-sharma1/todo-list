class Code {

    constructor(parent, inputCode, style = "language-c") {
        this.style = style;
        this.parent = parent;
        this.inputCode = inputCode.trim();
        this.displayCode(this.parent, this.inputCode, this.style)
        hljs.highlightAll();
    }

    displayCode(parent, inputCode, languageType) {
        parent.innerHTML =
            `
               <pre><code class=${languageType}>${inputCode}           
                </code></pre>
            `
        parent.firstChild.textContent = "";      
    }

}

export { Code }