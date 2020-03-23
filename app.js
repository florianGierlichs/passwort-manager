const fs = require('fs');

const [command, key, value] = process.argv.slice(2);

function get() {
  console.log('called GET', key);
  try {
    const passwordsJSON = fs.readFileSync('./db.json', 'utf8');
    const passwords = JSON.parse(passwordsJSON);

    console.log(passwords[key]);
    return passwords;
  } catch (error) {
    console.error(error);
  }
}

function set() {
  console.log('called SET', key, value);
  // Read db.json
  // Update value by key
  // Write db.json
  try {
    const passwordsJSON = fs.readFileSync('db.json', 'utf8');
    const passwords = JSON.parse(passwordsJSON);
    passwords[key] = value;
    console.log(passwords[key]);

    fs.writeFileSync('db.json', JSON.stringify(passwords, null, 2));
  } catch (error) {
    console.error(error);
  }
}

if (command === 'get') {
  get();
} else if (command === 'set') {
  set();
} else {
  console.error('Unknown command');
}
