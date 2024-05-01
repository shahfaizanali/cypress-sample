const path = require('path');
const fs = require('fs');

const basePath = path.join(process.cwd(), '..');

class FileUtils {

  static read = filePath => {
    const fromPath = path.join(basePath, filePath);
    return fs.readFileSync(fromPath);
  };
}

module.exports = FileUtils;
