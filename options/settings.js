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
    console.log(id);
    document.getElementById(id).checked = true;
  });
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector('.settings').addEventListener('change', saveOptions);
