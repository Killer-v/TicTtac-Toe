export function createDiv(className) {
  return createHTMLElement("div", className);
}

export function createButton(text, className) {
  const button = createHTMLElement("button", className);

  button.innerHTML = text;

  return button;
}

export function createInput(placeholder, className, value) {
  const input = createHTMLElement("input", className);

  if (placeholder) input.placeholder = placeholder;
  if (value) input.value = value;

  return input;
}

export function createHTMLElement(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;

  return element;
}
