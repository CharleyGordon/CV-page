const header = document.querySelector("header");

const headerAnchors = Array.from(header.querySelectorAll("a"));

function type({ element, pendingClassname, charArray = [], finished = false }) {
  if (!element.classList.contains(pendingClassname))
    element.classList.add(pendingClassname);
  if (charArray.length === 0 && !finished) {
    const { textContent } = element;
    element.textContent = "";
    charArray = textContent.split("");
  }
  if (charArray.length > 0) {
    if (charArray.length === 1) finished = true;
    setTimeout(() => {
      const string = charArray.shift();
      element.textContent += string;
      return type({ element, pendingClassname, charArray, finished });
    }, 30);
  }
}

function lightSection(event, className = "current") {
  let { target } = event;
  console.dir({ target });
  if (!target.matches("a")) return;
  for (anchor of headerAnchors) {
    anchor.classList.remove(className);
  }
  target.classList.add(className);
}

function preventDeatailsClose(event) {
  const { target } = event;
  if (target.closest("details")) event.preventDefault();
}

function redirect(event) {
  const { target } = event;
  console.dir({ target });

  if (!target.closest(".gmail") && !target.closest(".github")) return;
  if (target.matches("a")) return;
  const nextElement = target.nextElementSibling;
  const anchor = nextElement.querySelector("a");
  anchor.click();
}

header.addEventListener("click", lightSection);

document.body.addEventListener("click", preventDeatailsClose);

document.body.addEventListener("click", redirect);

const effects = {
  elements: {
    figcaptionCodes: document.querySelectorAll("figcaption code"),
  },
  classnames: {
    pending: "pending",
  },
  functions: {
    typewriter() {
      effects.elements.figcaptionCodes.forEach((code) => {
        type({ element: code, pendingClassname: effects.classnames.pending });
      });
    },
  },
};

effects.functions.typewriter();
