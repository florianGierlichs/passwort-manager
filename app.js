const fs = require('fs');

const [command, key, value] = process.argv.slice(2);

function get() {
  console.log('called GET', key);
  try {
    const passwordsJSON = fs.readFileSync('./db.json', 'utf8');
    const passwords = JSON.parse(passwordsJSON);
    console.log(passwords[key]);
  } catch (error) {
    console.error(error);
  }
}

function set() {
  console.log('called SET', key, value);
}

if (command === 'get') {
  get();
} else if (command === 'set') {
  set();
} else {
  console.error('Unknown command');
}
