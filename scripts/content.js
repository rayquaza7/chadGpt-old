// get input area
const input = document.querySelector(
  "#__next > div > div.flex.h-full.flex-1.flex-col.md\\:pl-\\[260px\\] > main > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient > form > div > div.flex.flex-col.w-full.py-2.pl-3.flex-grow.md\\:py-3.md\\:pl-4.relative.border.border-black\\/10.bg-white.dark\\:border-gray-900\\/50.dark\\:text-white.dark\\:bg-gray-700.rounded-md.shadow-\\[0_0_10px_rgba\\(0\\,0\\,0\\,0\\.10\\)\\].dark\\:shadow-\\[0_0_15px_rgba\\(0\\,0\\,0\\,0\\.10\\)\\] > textarea"
);

// get submit button
const button = document.querySelector(
  "#__next > div > div.flex.h-full.flex-1.flex-col.md\\:pl-\\[260px\\] > main > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient > form > div > div.flex.flex-col.w-full.py-2.pl-3.flex-grow.md\\:py-3.md\\:pl-4.relative.border.border-black\\/10.bg-white.dark\\:border-gray-900\\/50.dark\\:text-white.dark\\:bg-gray-700.rounded-md.shadow-\\[0_0_10px_rgba\\(0\\,0\\,0\\,0\\.10\\)\\].dark\\:shadow-\\[0_0_15px_rgba\\(0\\,0\\,0\\,0\\.10\\)\\] > button"
);

// get answer area
const answerArea = document.querySelector(
  "#__next > div > div.flex.h-full.flex-1.flex-col.md\\:pl-\\[260px\\] > main > div.flex-1.overflow-hidden > div > div > div"
);

/////////////////////////////////////////////
// KEYBOARD SHORTCUTS
//////////////////////////////////////////////

// only intercept if cmd + enter is pressed
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.metaKey) {
    input.value = promptEngineer();
  }
});

function promptEngineer() {
  const basicPrompt = `Answer the question as truthfully as possible, and if you're unsure of the answer, say "Sorry, I don't know".\n\nYou have access to a Python interpreter, so if you are not able to answer a question from memory, you can write a program that will answer the question.\n`;
  const prompt = `Q. ${input.value}`;
  return basicPrompt + prompt;
}

//////////////////////////////////////////////
// ADD REPLIT BUTTON TO CODE BLOCKS
//////////////////////////////////////////////

// check if there are any changes in answerArea
const answerAreaObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // if target starts with code
    if (mutation.target.nodeName === "CODE") {
      addReplitButton(mutation.target);
    }
  });
});

// Start observing the answer for changes in order to put replit button on code blocks
answerAreaObserver.observe(answerArea, {
  attributes: true, // Observe changes to attributes, including class
  childList: true, // Observe changes to children
  subtree: true, // Observe changes to children of children
});

// receive message from background.js to check for code blocks
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // if message is checkForCode
  if (request.message === "checkForCode") {
    // get all code blocks
    let codeBlocks = document.querySelectorAll("code");
    // for each code block
    codeBlocks.forEach((codeBlock) => {
      // add repl.it button
      addReplitButton(codeBlock);
    });
  }
});

// add repl.it button to an element
function addReplitButton(element) {
  // get full code block
  let grandpa = element.parentNode.parentNode;
  // check if this corresponds to a codeblock
  if (grandpa.className !== "bg-black mb-4 rounded-md") {
    return;
  }
  // get first child of code block, div that handles the top bar of the code block
  let firstChild = grandpa.firstChild;
  // check children
  let buttons = firstChild.children;
  // check if button already exists
  if (buttons.length == 2) {
    return;
  }
  // create button
  let replit = document.createElement("button");
  replit.className = "flex ml-auto gap-2";
  // add svg img from images to button for replits logo and style it
  replit.innerHTML = `<svg  height="1em" width="1em" class="h-4 w-4" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><g fill="#989ba1"><path d="M63.795 29.012l.148 2.933c0-1-.06-1.966-.148-2.933z"/><path d="M16.405 28.843s-8.882 32.73 26.722 33.015a31.94 31.94 0 0 0 20.65-26.646c.086-.85.112-1.717.13-2.586l.034-.68c0-1-.06-1.966-.148-2.933-9.405 37.03-51.018 22.525-47.388-.17z"/></g><path d="M34.816 16.694S1.668 7.44 2.175 43.583c1.7 4.368 4.336 8.31 7.725 11.55.14.135.3.262.434.395.96.884 1.97 1.708 3.03 2.47.164.118.32.246.484.362a31.81 31.81 0 0 0 3.497 2.076c.35.18.7.346 1.07.514a31.61 31.61 0 0 0 3.194 1.296c.267.09.522.205.792.3 1.303.4 2.63.714 3.975.942.406.072.82.13 1.23.188a32.04 32.04 0 0 0 4.209.328c.054 0 .106.008.16.008 1.062 0 2.11-.057 3.146-.16-37.198-8.874-23.055-50.465-.305-47.147z" fill="#929497"/><path d="M47.737 33.836S55.58.77 20.277 2.25A31.62 31.62 0 0 0 .387 36.29c7.43-37.4 49.758-25.297 47.35-2.452zm-16.95 14.23S63.995 52.4 61.917 20.83A31.77 31.77 0 0 0 26.207.55c37.003 4.542 27.386 47.838 4.58 47.515zm10.43-16.12a8.95 8.95 0 1 1-8.944-8.948 8.95 8.95 0 0 1 8.944 8.948z" fill="#989ba1"/></svg>Run on Replit`;
  replit.onclick = () => {
    let language = element.className.split("language-")[1];
    let url = `https://replit.com/@replit/${
      language.charAt(0).toUpperCase() + language.slice(1)
    }?v=1`;
    window.open(url);
  };
  firstChild.appendChild(replit);
}
