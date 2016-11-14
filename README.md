# random wikipedia newtab
Firefox extension that redirects to a random wikipedia page when you open a new tab, because when you're opening a new tab you're looking for a distraction and that distraction might as well be a weird fact

### this is the way I'm developing extensions although you can certainly do it without npm

1. install npm

2. install web-ext: `npm install --global web-ext`

3. run in project folder: `web-ext run`

4. navigate to `about:addons` in the firefox window that opens. click extensions. it's installed :D extension will auto update as you save files in the project.

### notes

cool stuff I found while trying to do the least work possible to scrape wikipedia pages:

- wiki api supports [parsing](https://www.mediawiki.org/wiki/API:Parsing_wikitext) :D
- wiki api [sandbox](https://www.mediawiki.org/wiki/Special:ApiSandbox)!  which I used to navigate the cumbersome wiki api
- [nice](https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Wikipedia%3AUnusual_articles&prop=links)


### todo

- escape custom wiki page chars
