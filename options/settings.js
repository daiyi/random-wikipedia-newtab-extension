let optionsSavedEvent = new Event('optionsSaved',
	{
		detail: {
			time: new Date(),
		},
		bubbles: true,
		cancelable: true
	});

function saveOptions(e) {
  let id = e.target.id;

  browser.storage.local.set({sourceID: id});

  e.target.dispatchEvent(optionsSavedEvent);
}

function loadOptions() {
  getSelectedSourceID(id => {
    document.getElementById(id).checked = true;
  });
}

function processNewSettings(e) {
  let {id, value} = e.target;

  // check if page set is already in storage
  browser.storage.local.get(id, (data) => {
    if (!data[id]) {
      getNewWikiPages(value);
    }
  });
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector('.settings').addEventListener('change', saveOptions);

// todo use storage.onChanged
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/onChanged
document.addEventListener('optionsSaved', processNewSettings);
