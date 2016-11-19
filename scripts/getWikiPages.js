const PAGE_KEY = 'title';

function getSelectedSourceID(callback) {
  browser.storage.local.get('sourceID', (data) => {
    callback(data.sourceID);
  });
}

function saveDataset(data) {
  getSelectedSourceID(id => {
    browser.storage.local.set({[id]: data});
  });
}

// TODO refact0r
function getDataset() {
  browser.storage.local.get('sourceID', (data) => {
    let id = data.sourceID;
    if (!id) {
      id == 'wikipedia';
    }
    document.getElementById(id).checked = true;
  });
}

function processNewPages(response) {
  let pagesObj = JSON.parse(response).query.pages;
  let links = pagesObj[Object.keys(pagesObj)[0]].links;
  let pages = [];

  for (let linkObj of links) {
    (linkObj.ns === 0) && pages.push(linkObj[PAGE_KEY]);
  }

  saveDataset(pages);
}

function getNewWikiPages(pageName) {
  let req = new XMLHttpRequest();
  let url = `https://en.wikipedia.org/w/api.php?action=query&titles=${pageName}&format=json&prop=links&pllimit=500`
  req.open("GET", url, true);
  req.addEventListener("readystatechange", function() {
    if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      processNewPages(req.response);
    }
  });
  req.send(null);
}


// todo use storage.onChanged
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/onChanged
function processNewSettings(e) {
  let {id, value} = e.target;

  if (!getDataset(id)) {
    getNewWikiPages(value);
  }
}

document.addEventListener('optionsSaved', processNewSettings);
