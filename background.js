// when a tab is updated, check if it is a chat.openai.com tab and send a message to the content script
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.startsWith("https://chat.openai.com/chat")) {
    chrome.tabs.sendMessage(tabId, {
      message: "checkForCode",
    });
  }
});

// on install add content script to all chat.openai.com tabs
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
