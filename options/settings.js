function saveOptions(e) {
  let id = e.target.id;
  browser.storage.local.set({
    random_wiki_ext_data: {
      sourceID: id
    }
  });
}

function restoreOptions() {
  browser.storage.local.get('random_wiki_ext_data', (data) => {
    let id = data.random_wiki_ext_data && data.random_wiki_ext_data.sourceID || 'wikipedia';
    document.getElementById(id).checked = true;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('.settings').addEventListener('change', saveOptions);
