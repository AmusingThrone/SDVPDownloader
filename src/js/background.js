var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?stardew\.info\/planner/;

function downloadFarm(filename) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon48.png",
    title: "SDVPDownloader: Export Complete!",
    message: `${filename} successfully downloaded!`,
    eventTime: Date.now() + 5 * 100,
    silent: true
  });
}

chrome.browserAction.setIcon({
  path: {
    "16": "icons/icon16gray.png",
    "32": "icons/icon32gray.png",
    "48": "icons/icon48gray.png",
    "128": "icons/icon128gray.png",
    "256": "icons/icon256gray.png",
    "512": "icons/icon512gray.png"
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (urlRegex.test(tab.url))
    chrome.browserAction.setIcon({
      path: {
        "16": "icons/icon16.png",
        "32": "icons/icon32.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png",
        "256": "icons/icon256.png",
        "512": "icons/icon512.png"
      },
      tabId: tab.id
    });
});

chrome.tabs.onActivated.addListener(function (evt) {
  chrome.tabs.get(evt.tabId, function (tab) {
    if (urlRegex.test(tab.url))
      chrome.browserAction.setIcon({
        path: {
          "16": "icons/icon16.png",
          "32": "icons/icon32.png",
          "48": "icons/icon48.png",
          "128": "icons/icon128.png",
          "256": "icons/icon256.png",
          "512": "icons/icon512.png"
        },
        tabId: tab.id
      });
  });
});

chrome.browserAction.onClicked.addListener(function (tab) {
  if (urlRegex.test(tab.url)) {
    chrome.tabs.sendMessage(tab.id, {
      text: 'report_back'
    }, downloadFarm);
  }
});