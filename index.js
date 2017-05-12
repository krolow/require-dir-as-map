const assert = require('assert');
const fs = require('fs');


module.exports = function requireDirAsMap(directory, options) {
  assert(directory, 'It\'s necessary to pass a directory path');

  const map    = options && options.map || defaultMap;
  const filter = options && options.filter;


  const files = fs.readdirSync(directory);

  return filterFilesIfNeeded(filter, files)
    .reduce((modules, file) => {
      const module = require(`${directory}${file}`);
      const name = map({ file, module });

      modules.set(name, module);

      return modules;
    }, new Map());
};


function filterFilesIfNeeded(filter, files) {
  if (filter) {
    return files.filter(filter);
  }

  return files;
}


function defaultMap({ file }) {
  return file.split('.')[0];
}
