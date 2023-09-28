export class Create {
    createInput(className) {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add(className);

        return input;
    }

    createDiv(className) {
        const div = document.createElement("div");
        div.classList.add(className);

        return div;
    }

    createButton(className) {
        const button = document.createElement("button");
        button.className = className;

        return button;
    }
}

export const create = new Create();