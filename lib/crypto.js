const { readMasterPassword } = require('./masterPassword');
const crypto = require('crypto');

let resizedIV = Buffer.allocUnsafe(16);
const iv = crypto.createHash('sha256').update('myHashedIV').digest();
iv.copy(resizedIV);

function getMasterPassword(secret) {
  return crypto.createHash('sha256').update(secret).digest();
}

function encrypt(value) {
  const readedMasterPassword = readMasterPassword();
  console.log(readedMasterPassword);
  const masterPassword = getMasterPassword(readedMasterPassword);

  const cryptoCipher = crypto.createCipheriv(
    'aes256',
    masterPassword,
    resizedIV
  );

  let encryptedValue = cryptoCipher.update(value, 'utf-8', 'hex');
  encryptedValue += cryptoCipher.final('hex');

  return encryptedValue;
}

function decrypt(encryptedValue) {
  const readedMasterPassword = readMasterPassword();
  const masterPassword = getMasterPassword(readedMasterPassword);

  const cryptoCipher = crypto.createDecipheriv(
    'aes256',
    masterPassword,
    resizedIV
  );

  let decryptedValue = cryptoCipher.update(encryptedValue, 'hex', 'utf-8');
  decryptedValue += cryptoCipher.final('utf-8');

  return decryptedValue;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, 'sha512')
    .toString('hex');

  return [salt, hash].join('$');
}

function verifyHash(password, original) {
  const [salt, originalHash] = original.split('$');
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, 'sha512')
    .toString('hex');

  return hash === originalHash;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.hashPassword = hashPassword;
exports.verifyHash = verifyHash;
