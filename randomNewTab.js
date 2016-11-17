const WIKIPEDIA_URL_BASE = 'https://en.wikipedia.org/wiki/';

function checkTab(tabs) {
  // window.alert();
  for (tab of tabs) {
    if (tab.url === 'about:newtab') {
      browser.storage.local.get('sourceID', data => {
        let id = data.sourceID;
        if (id !== 'wikipedia') {
          browser.storage.local.get(id, dataset => {
            let pages = dataset[id];
            let randomIndex = (Math.floor(Math.random() * pages.length));
            let url = WIKIPEDIA_URL_BASE + pages[randomIndex];

            browser.tabs.update({url});
          });
        }
        else {
          browser.tabs.update({url: 'https://en.wikipedia.org/wiki/Special:Random'});
        }
      });
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
