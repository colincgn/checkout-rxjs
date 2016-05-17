const RxNode = require('rx-node');
const products = require('./config/inventory.js').products;

var userInput = RxNode.fromStream(process.stdin, 'end')
    .map(userInput => userInput.toString().toLowerCase().trim());

var calculateTotal = userInput.filter(function (userInputString) {
    return userInputString === 'checkout'
});


const itemsPurchased = userInput.takeUntil(calculateTotal)
    .filter(userInputString => products.indexOf(userInputString) > -1)
    .groupBy(x => x)
    .flatMap((x) => {
      return x.count()
        .map(val => {
            return {item:x.key, quantity:val}
        })
    })

function runApp() {
    itemsPurchased.subscribe(
        obs => console.log(obs),
        err => console.log('Error: ' + err),
        () => { process.exit()}
    );
}

runApp();
