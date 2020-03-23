const { readPasswords, writePasswords } = require('./lib/passwords');
const { get, set, unset } = require('./lib/commands');

const [command, key, value] = process.argv.slice(2);

if (command === 'get') {
  get(key, readPasswords);
} else if (command === 'set') {
  set(key, value, readPasswords, writePasswords);
} else if (command === 'unset') {
  unset(key, readPasswords, writePasswords);
} else {
  console.error('Unknown command');
}
