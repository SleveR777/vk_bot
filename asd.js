function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
let a = '1234567'
const chalk = require('chalk');

console.log(chalk.hex('#6AFF9F')('Error!'));
console.log(chalk.bold.red('Success!'))
sleep(2000)
sleep(5000)