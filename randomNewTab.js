const WIKIPEDIA_URL_BASE = 'https://en.wikipedia.org/wiki/';
const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/w/';
const DEFAULT_SOURCE_ID = "unusual_wikipedia";
const DEFAULT_SOURCE_VALUE = "Wikipedia:Unusual_articles";

function saveDataset(data) {
  getSelectedSourceID(id => {
    browser.storage.local.set({[id]: data});
  });
}

function getSelectedSourceID(callback) {
  browser.storage.local.get('sourceID', (data) => {
    callback(data.sourceID);
  });
}

function processNewPages(response) {
  let pagesObj = JSON.parse(response).query.pages;
  let links = pagesObj[Object.keys(pagesObj)[0]].links;
  let pages = [];

  for (let linkObj of links) {
    (linkObj.ns === 0) && pages.push(linkObj.title);
  }

  saveDataset(pages);
}

function getNewWikiPages(pageName) {
  let req = new XMLHttpRequest();
  let url = `${WIKIPEDIA_API_BASE}api.php?action=query&titles=${pageName}&format=json&prop=links&pllimit=500`
  req.open("GET", url, true);
  req.addEventListener("readystatechange", function() {
    if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      processNewPages(req.response);
    }
  });
  req.send(null);
}

function checkTab(tabs) {
  // window.alert();
  for (let tab of tabs) {
    if (tab.url === 'about:newtab') {
      browser.storage.local.get('sourceID', data => {
        let {sourceID} = data;
        if (sourceID === undefined) {
          sourceID = DEFAULT_SOURCE_ID
          browser.storage.local.set({sourceID});
          getNewWikiPages(DEFAULT_SOURCE_VALUE);
        }
        if (sourceID !== 'wikipedia') {
          browser.storage.local.get(sourceID, dataset => {
            let pages = dataset[sourceID];
            let randomIndex = (Math.floor(Math.random() * pages.length));

            browser.tabs.update({url: `${WIKIPEDIA_URL_BASE}${pages[randomIndex]}`});
          });
        }
        else {
          browser.tabs.update({url: `${WIKIPEDIA_URL_BASE}${DEFAULT_SOURCE_VALUE}`});
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
browser.runtime.onInstalled.addListener(function() {
  browser.tabs.create({'url': browser.extension.getURL('options/settings.html')});
});
