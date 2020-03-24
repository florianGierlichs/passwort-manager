const fs = require('fs');

function readMasterPassword() {
  console.log('Master-Password is read!');
  const dbJSON = fs.readFileSync('./db.json', 'utf8');
  const db = JSON.parse(dbJSON);

  console.log(db.masterPassword);
  return db.masterPassword;
}

exports.readMasterPassword = readMasterPassword;
