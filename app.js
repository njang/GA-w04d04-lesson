var myModule = require('./wdi_tx_13.js')

// Variables and such that were not exported aren't in scope
console.log("number is " + typeof number) // undefined

// Anything exported can be accessed on the object
console.log("Campus is: ", myModule.campus)

myModule.onThree();
myModule.lunch();
// Let's see the module we imported
console.log(myModule);