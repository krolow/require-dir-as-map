const assert = require('assert');
const requireDirAsMap = require('../');

const fixturesDir = `${__dirname}/fixtures/`;
describe('require-dir-as-map', () => {
  it('should return a hash table', () => {
    const modules = requireDirAsMap(fixturesDir);
    assert(modules instanceof Map);
  });

  it('should forward error of readdir', () => {
    assert.throws(() => requireDirAsMap('/i-do-no-exists/dir/'), 'ENOENT: no such file or directory, scandir \'/i-do-no-exists/dir/\'');
  });

  it('should send error when no directory is given', () => {
    assert.throws(() => requireDirAsMap(), 'It\'s necessary to pass a directory path');
  });

  it('should return a map containing files of the given directory', () => {
    const modules = requireDirAsMap(fixturesDir);
    assert.equal(modules.size, 3);
    assert(modules.has('a'));
    assert.equal(modules.get('a')(), 'a');

    assert(modules.has('b'));
    assert.equal(modules.get('b')(), 'b');

    assert(modules.has('c'));
    assert.equal(modules.get('c')(), 'c');
  });

  it('should be able to filter files based on a function', () => {
    const filter = file => file.endsWith('c.js');
    const modules = requireDirAsMap(fixturesDir, { filter });

    assert.equal(modules.size, 1);
    assert(modules.has('c'));
    assert.equal(modules.get('c')(), 'c');
  });

  it('should be able to map files to a different name', () => {
    const map = ({ file, module }) => {
      if (module.moduleName) {
        return module.moduleName;
      }

      return file.split('.')[0].toUpperCase();
    };

    const modules = requireDirAsMap(fixturesDir, { map });
    assert(!modules.has('a'));
    assert(modules.has('A'));
    assert(!modules.has('b'));
    assert(modules.has('B'));
    assert(!modules.has('c'));
    assert(!modules.has('C'));
    assert(modules.has('c-module'));
  });
});
