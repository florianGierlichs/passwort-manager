const fs = require('fs');

function readMasterPassword() {
  console.log('Master-Password is read!');
  const dbJSON = fs.readFileSync('./db.json', 'utf8');
  const db = JSON.parse(dbJSON);
  const masterPassword = JSON.stringify(db.masterPassword);
  console.log(masterPassword);
  return masterPassword;
}

exports.readMasterPassword = readMasterPassword;
