function checkTab(tabs) {
  for (tab of tabs) {
    if (tab.url === 'about:newtab') {
      browser.tabs.update({url: 'https://en.wikipedia.org/wiki/Special:Random'});
    }
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function newTabEvent(tab) {
  var queryActiveTab = browser.tabs.query({currentWindow: true, active: true});
  queryActiveTab.then(checkTab, onError);
}

browser.tabs.onCreated.addListener(newTabEvent);
