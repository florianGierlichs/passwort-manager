const { readPasswords, writePasswords } = require('./passwords');

function get(key) {
  console.log('called GET', key);
  try {
    const passwords = readPasswords();

    console.log(passwords[key]);
    return passwords;
  } catch (error) {
    console.error(error);
  }
}

function set(key, value) {
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

function unset(key) {
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

exports.get = get;
exports.set = set;
exports.unset = unset;
