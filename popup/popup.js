// The JavaScript to switch between the tabs
const tabs = document.querySelectorAll(".tab");

function switchTab(event) {
  const tab = event.currentTarget;
  const tabPane = document.querySelector(`[data-tab="${tab.dataset.tab}"]`);

  // Deactivate current active tab and tab pane
  document.querySelector(".tab.active").classList.remove("active");
  document.querySelector(".tab-pane.active").classList.remove("active");

  // Activate new tab and tab pane
  tab.classList.add("active");
  tabPane.classList.add("active");
}

tabs.forEach((tab) => tab.addEventListener("click", switchTab));
