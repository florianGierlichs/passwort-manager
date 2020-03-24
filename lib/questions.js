const readline = require('readline');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askForPassword(key) {
  return new Promise((resolve) => {
    readlineInterface.question(
      `Please type in the password for ${key}: `,
      (password) => {
        resolve(password);
        readlineInterface.close();
      }
    );
  });
}

exports.askForPassword = askForPassword;
