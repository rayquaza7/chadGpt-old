// // when a tab is updated, check if it is a chat.openai.com tab and send a message to the content script
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (tab.url.startsWith("https://chat.openai.com/chat")) {
//     chrome.tabs.sendMessage(tabId, {
//       message: "checkForCode",
//     });
//   }
// });

// // on install add content script to all chat.openai.com tabs
// chrome.runtime.onInstalled.addListener(async () => {
//   for (const cs of chrome.runtime.getManifest().content_scripts) {
//     for (const tab of await chrome.tabs.query({ url: cs.matches })) {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: cs.js,
//       });
//     }
//   }
// });
chrome.webRequest.onBeforeRequest.addListener(
  async function (request) {
    console.log(request);
    const requestBody = request.requestBody;
    console.log(requestBody);
    if (requestBody && requestBody.raw) {
      const payload = [];
      for (const item of requestBody.raw) {
        const blob = item.bytes;
        payload.push(new TextDecoder().decode(await blob.arrayBuffer()));
      }
      console.log(payload.join(""));
    }

    // const payloadObject = JSON.parse(payload);
    // payloadObject.prompt = "modified prompt";
    // const newPayload = JSON.stringify(payloadObject);
    // request.requestBody.raw = [new Blob([newPayload])];

    // return { requestBody: request.requestBody };
  },
  { urls: ["https://chat.openai.com/chat/conversation"] },
  ["requestBody"]
);
