const contextCheckbox = document.getElementById("context");
const honestCheckbox = document.getElementById("honest");
const nsfwCheckbox = document.getElementById("nsfw");
const pythonCheckbox = document.getElementById("python");

// Define a function to save the checkbox values to chrome.storage
function saveCheckboxValues() {
  // Get the current values of the checkboxes
  const context = contextCheckbox.checked;
  const honest = honestCheckbox.checked;
  const nsfw = nsfwCheckbox.checked;
  const python = pythonCheckbox.checked;

  // Save the values to chrome.storage
  chrome.storage.sync.set({ context, honest, nsfw, python }, function () {
    console.log("Checkbox values saved");
  });
}

contextCheckbox.addEventListener("change", saveCheckboxValues);
honestCheckbox.addEventListener("change", saveCheckboxValues);
nsfwCheckbox.addEventListener("change", saveCheckboxValues);
pythonCheckbox.addEventListener("change", saveCheckboxValues);

chrome.storage.sync.get(
  ["context", "honest", "nsfw", "python"],
  function (result) {
    contextCheckbox.checked = result.context;
    honestCheckbox.checked = result.honest;
    nsfwCheckbox.checked = result.nsfw;
    pythonCheckbox.checked = result.python;
  }
);
