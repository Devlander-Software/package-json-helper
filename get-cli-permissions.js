const fs = require('fs');
const os = require('os');
const path = require('path');

const username = os.userInfo().username; // Get the current user's username
const dynamicPath = `/Users/${username}/.npm/_npx/`; // Start path

const targetFile = 'pkg-helper'; // Name of the file to find
const targetDirectory = '/node_modules/.bin/'; // Target directory to look for the file

const changePermissions = (filePath) => {
  fs.chmod(filePath, '755', (err) => {
    if (err) {
      console.error(`Error setting permissions for ${filePath}: ${err.message}`);
      return;
    }
    console.log(`Permissions updated for ${filePath}`);
  });
};

const searchFile = (dir) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}: ${err.message}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory()) {
        // Recurse into subdirectories
        searchFile(filePath);
      } else if (file.name === targetFile && dir.includes(targetDirectory)) {
        // Check if the file is the target and in the correct directory
        console.log(`Found ${targetFile} at ${filePath}`);
        changePermissions(filePath);
      }
    });
  });
};

searchFile(dynamicPath);
