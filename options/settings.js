function saveOptions(e) {
  let option = document.forms.settings.elements.source.value;
  console.log('saving!');
  console.log('source:', option);
  browser.storage.local.set({
    'random_wikipedia_newtab_extension': {
      source: JSON.parse(option) || 'wikipedia'
    }
  });
}

function restoreOptions() {
  console.log('restoring!');
  browser.storage.local.get('random_wikipedia_newtab_extension', (savedOptions) => {
    let option = savedOptions.random_wikipedia_newtab_extension.source;
    console.log(option);
    document.forms.settings.value = option || 'wikipedia';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('.settings').addEventListener('change', saveOptions);
