const PAGE_KEY = 'title';

let response = `{
    "parse": {
        "title": "List of cognitive biases",
        "pageid": 510791,
        "links": [{
            "ns": 14,
            "title": "Category:Articles lacking reliable references from November 2013"
        }, {
            "ns": 14,
            "title": "Category:Articles lacking reliable references from October 2013"
        }, {
            "ns": 10,
            "title": "Template:Biases"
        }, {
            "ns": 0,
            "title": "Anthropomorphism"
        }, {
            "ns": 0,
            "title": "Apophenia"
        }, {
            "ns": 4,
            "title": "Wikipedia:Citation needed"
        }, {
            "ns": 100,
            "title": "Portal:Thinking"
        }]
    }
}`;

function getSelectedSourceID(callback) {
  browser.storage.local.get('sourceID', (data) => {
    callback(data.sourceID);
  });
}

function saveDataset(data) {
  getSelectedSourceID(id => {
    console.log('saving', id);
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

function getNewPages() {
  let links = JSON.parse(response).parse.links;
  let pages = [];

  for (let linkObj of links) {
    (linkObj.ns === 0) && pages.push(linkObj[PAGE_KEY]);
  }

  saveDataset(pages);
}


// todo use storage.onChanged
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/onChanged
function processNewSettings(e) {
  let id = e.target.id;
  if (!getDataset(id)) {
    getNewPages();
  }
}

document.addEventListener('optionsSaved', processNewSettings);
