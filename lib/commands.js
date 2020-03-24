const { readPasswords, writePasswords } = require('./passwords');
const { encrypt, decrypt } = require('./crypto');

function get(key) {
  console.log('called GET', key);
  try {
    const passwords = readPasswords();
    const encryptedPassword = passwords[key];
    const decryptedPassword = decrypt(encryptedPassword);

    console.log('hash: ', passwords[key]);
    console.log('password: ', decryptedPassword);
    return passwords;
  } catch (error) {
    console.error(error);
  }
}

function set(key, value) {
  console.log('called SET', key, value);

  const encryptedPassword = encrypt(value);

  try {
    const passwords = readPasswords();
    passwords[key] = encryptedPassword;
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
