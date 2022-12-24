chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.startsWith("https://chat.openai.com/chat")) {
    chrome.tabs.sendMessage(tabId, {
      message: "checkForCode",
    });
  }
});

chrome.runtime.onInstalled.addListener(async () => {
  for (const cs of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({ url: cs.matches })) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: cs.js,
      });
    }
  }
});
