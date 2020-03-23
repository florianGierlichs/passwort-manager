// const passwords = require('./lib/passwords');
// const readPasswords = passwords.readPasswords;
// const writePasswords = passwords.writePasswords;
const { readPasswords, writePasswords } = require('./lib/passwords');

const [command, key, value] = process.argv.slice(2);

function get() {
  console.log('called GET', key);
  try {
    const passwords = readPasswords();

    console.log(passwords[key]);
    return passwords;
  } catch (error) {
    console.error(error);
  }
}

function set() {
  console.log('called SET', key, value);

  try {
    const passwords = readPasswords();
    passwords[key] = value;
    console.log(passwords[key]);

    writePasswords(passwords);
  } catch (error) {
    console.error(error);
  }
}

function unset() {
  console.log('called UNSET', key);
  try {
    const passwords = readPasswords();
    delete passwords[key];
    console.log(passwords[key]);

    writePasswords(passwords);
  } catch (error) {
    console.error(error);
  }
}

if (command === 'get') {
  get();
} else if (command === 'set') {
  set();
} else if (command === 'unset') {
  unset();
} else {
  console.error('Unknown command');
}
