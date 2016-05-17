const RxNode = require('rx-node');

var userInput = RxNode.fromStream(process.stdin, 'end')
    .map(userInput => userInput.toString().toLowerCase().trim());

var calculateTotal = userInput.filter(function (userInputString) {
    return userInputString === 'checkout'
});

const items = ['apple', 'oranges'];

const itemsPurchased = userInput.takeUntil(calculateTotal)
    .filter(userInputString => items.indexOf(userInputString) > -1)
    .groupBy(x => x)
    .flatMap((x) => {
      return x.count()
        .map(val => {
            return {item:x.key, quantity:val}
        })
    })

itemsPurchased.subscribe(obs => console.log(obs),
        err => console.log('Error: ' + err),
        () => {
            console.log('Completed');
            process.exit();
        });