let codesToCopy = [];

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll("code").forEach((el) => {
        let html = el.innerHTML;
        let fileName = el.getAttribute("file");

        let replacement = document.createElement("div");
        replacement.classList.add("code-snipet");

        let pre = document.createElement("pre");
        let code = document.createElement("code");

        if (fileName != null) {
            let header = document.createElement("div");
            header.classList.add("code-header");
            header.innerHTML = `<div><i class="fa-regular fa-file"></i>${fileName}</div>`;

            codesToCopy.push(el.innerHTML);

            let copy = document.createElement("i");
            copy.classList.add("fa-regular", "fa-copy");
            copy.setAttribute("title", "Másolás");
            copy.setAttribute("data-code", codesToCopy.length - 1);
            header.appendChild(copy);

            replacement.appendChild(header);

            copy.addEventListener("click", function (e) {
                let data = this.getAttribute("data-code");

                navigator.clipboard.writeText(codesToCopy[data])
                    .then(response => {
                        this.classList.add("fa-check", "fa-solid");
                        this.classList.remove("fa-regular", "fa-copy");

                        setTimeout(() => {
                            this.classList.remove("fa-check", "fa-solid");
                            this.classList.add("fa-regular", "fa-copy");
                        }, 1000);
                    })
                    .catch(err => console.log(err));
            });
        }

        code.innerHTML = html;
        code.classList.add("language-python");
        pre.appendChild(code);
        replacement.appendChild(pre);

        el.replaceWith(replacement);
    });

    document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
    });

    number();
});

const number = () => {
    const codes = document.querySelectorAll("code.language-python");

    for (let i = 0; i < codes.length; i++) {
        let code = codes[i];

        let result = "";

        let html = code.innerHTML;
        let lines = html.split("\n");

        for (let j = 0; j < lines.length; j++) {
            let line = lines[j];
            let highlighted = false;

            if (line.indexOf("+*+") != -1) {
                line = line.substring(0, line.indexOf("+*+"));
                highlighted = true;
            }

            result += `<span class="${highlighted ? 'highlighted' : ''}"><span class="number">${j + 1}</span>${line}</span>`;
        }

        console.log(result);
        code.innerHTML = result;
    }
}