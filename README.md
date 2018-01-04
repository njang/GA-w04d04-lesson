# GA-w04d04-lesson

# Intro to Node and Express

### Objectives
1. Explain what Node.js is & why it exists
1. Use module.exports and require to organize code
1. Describe what a web server is
1. Install Node packages
1. Set up a basic Express server
1. Set up a basic GET route
1. Use nodemon to restart your sever when your code changes
1. Save a record of what packages your application uses

## Intro to Node.js

### Preparation
- Write basic Javascript
- Understand backend vs. front-end
- Have written a basic front-end application

## What is Node.js?

Ryan Dahl, creator of Node.js, took javascript (which normally only runs in the browser) and made it available in your computer (on the server side). They took Google's V8 JavaScript Engine and gave it the ability to compile JS programs into machine code.

Keep in mind, Node.js is strictly a tool to run JavaScript on a server – while it's possible to build web applications and APIs in straight JS, we'll actually be using a framework on top of Node called Express. 

## What's so great about Node.js?

- One language for the whole tech stack
- A large, engaged developer community
- It's _event-driven_ and _asynchronous 
- **FAST** IO (input - output), means scales to many users easily

#### Event Driven and Asynchronous - a closer look

While most languages do things one thing at a time, Node purposefully sends nearly everything to the background and keeps going. Meaning it puts everything in a call stack to be ran as soon as there is free processing power. 

Let's find a nice visualization of the Node Call Stack...

Imagine a paper delivery boy riding on his bike delivering papers every morning. Imagine he stops at each house, throws the paper on your doorstep, and waits to make sure you come out & pick it up before moving on to the next house. That would be what we'd call _blocking_ – each line of code finishes before moving on to the next line of code.

Now imagine the paperboy throwing the newspaper on your porch but never stopping his bicycle; never stopping, he just keeps throwing papers on porches, so that by the time you pick it up he'll be 3 or 4 houses down. That would be _non-blocking_, or _asynchronous_.

## Limitations of Node.js

- It's still fairly new, so it doesn't have as many excellent pre-built solutions as more mature ecosystems like Python. Python has a library for _everything_
- While its IO speed is great, its data processing speed is not. Meaning it is fantastic for tons of users doing simple operations (think twitter), but not great for process-heavy tasks (think Google Earth)
- Also due to it's newness, the ecosystem is very complex, and changes very fast, which can be frustrating

#### Installing Node.js

To check if we already have Node installed, type: ``node -v`` in terminal. You will see the Node version if it's installed.

If it's not installed, you can install from the Node.js website, or better yet, use Homebrew like this:
```
brew install node
```

This will install both Node.js and npm, a package manager for Node similar to rubygems for Ruby. One of the advantages of using Homebrew is that you can update your versions easily like this:

```
brew upgrade node
```


## Getting reacquainted with Node REPL (read evaluate print loop)

Let's do this together: 

Type node in terminal to launch Node's REPL (Read-Eval-Print-Loop) interactive utility. 

```js
node

> 10 + 5
// 15

> var a = [ 1, 2, 3];
// undefined

> a.forEach(function(v) {
... console.log(v);
... });
// 1
// 2
// 3

> var http = require('http');
// undefined

> http
// [ a massive 'http' object returned from the 'http' module ]
```

Press control-c twice to exit REPL.

#### Executing a JS program Review

```bash
mkdir first-node
cd first-node
touch main.js
echo "console.log('hello world!');" >> main.js
node main.js
# hello world!
```

## Node Modules

Like most other modern languages, Node is modular. This means code can be _encapsulated_, or wrapped in a requirable object. 

How it works in Node: 

1. Make a file
2. Put code inside of an object called module.exports, which node provides automatically and associates with the file
3. Pull that code into any other file using `require()`.

For example: 
I can make two files

```bash
touch my-module.js main.js
```

```js
// my-module.js
var number = 7
module.exports.name = "Kendrick"
module.exports.arr = [1, 2, 3]
module.exports.getNumber = function(){
    console.log("Get number called. Returning: ", number)
    return number
}

console.log("End of my-module.js file")
```


```js
// main.js

// here we're grabbing everything that's "exported" in our other file, and storing it a variable called 'my'
var my = require('./my-module')

// Variables and such that were not exported aren't in scope
console.log("number is " + typeof number) // undefined

// Anything exported can be accessed on the object
console.log("Name is: ", my.name)

// Closures are still closures
console.log("The number is: " + my.getNumber())

// JavaScript is still JavaScript
console.log("The array contains " + my.arr.length + " elements")

// Let's see the module we imported
console.log(my)
```

```bash
node my-module.js
node main.js
```

&#x1F535; **Activity**
```
* create two files on your own, one called app.js and one called wdi_tx_13.js
* in wdi_tx_13.js add some properties to module.exports about our awesome cohort
* add a couple of functions as well
* in app.js require your module and save it in a variable
* from app.js console.log a couple of attributes on this variabel
* from app.js call a couple of methods
* celebrate! You just created your first node module!
* 10 minutes

```

#### Things to Note

`module.exports` - this is an object to store the things that a module _exports_, i.e. shares with a file it's `required` in
`require()` - returns the `module.exports` of the file that was required; it should normally be stored in a variable

> Note: The module's source file is only executed the first time that file is required.

## npm - "Node Package Manager"

Node uses a package management system to distribute open-source modules, like the one we just made!
We can publish our little module to NPM, and then others can download and use it! We will be using NPM to use node modules all of the time in Unit 2. 

In addition to giving you the ability to download the packages, it also manages where on your local system they will be stored. It scopes your packages to your specific project. So if you have 6 projects that use express.js, you will actually have 6 copies of express.js, which will not overlap or run into eachother. This alleviates a LOT of problems.

We can use the **N**ode **P**ackage **M**anager by running its command, `npm`.

When building apps in Node, we use NPM and a file called `package.json`. This file is a list of every node module we need in our project. When we install a node module in a project, it gets added to our "list".

Our packages don't get saved in our repos to save our repos from bloat. When you clone another node project, you just run `npm install` and this will download from NPM every package in the `package.json` file!

We'll get plenty of practice using these. 

## Intro to Express

## Review of what a web server is

A server is just a computer that is always on and connected to the internet.  Other computers can try to connect to it to retrieve information

![Request Response Cycle](https://cdn.zapier.com/storage/photos/9ec65c79de8ae54080c1b417540469a6.png)

A web server is just a server that sends dynamic HTML pages, meaning that the HTML is pretty much the same for every page, but is altered slightly depending on the data that is requested.  Think of amazon.com where one book's page looks pretty similar to another book's page, just with different text. It can also send JSON data to be interpreted on the front end.

In this unit, we'll be writing web applications that a computer will run that will allow the computer to respond to other computers that try to connect to it.  We'll write this code in JavaScript using Node.js, which allows us to write computer applications using JavaScript.

## What is Express?

- Express is a **back end web application framework**

#### Libraries vs Packages vs Modules vs Frameworks

**In Node, Packages, Modules and Libraries are all the same thing.**

**A Framework is a type of Library** 

- Libraries
    - A collection of functions, objects, and even other libraries that you call
    - It has no idea what you're going to build
- Frameworks
    - Is essentially just a library
    - Is also a pre-conceived skeleton for an application
    - It knows what you're going to build and is somewhat opinionated about how you should do it

let's install the `express` framework:

```
npm install express
```

## Set up a basic Express server

Now that the library has been installed (downloaded), we can use it in our code, by using the `require()` function

```javascript
const express = require('express');
```

- The `require()` function takes whatever code was written for the specified library and returns it
    - We'll typically store the return value of `require()` in a variable of the same name
        - Think of the variable as the library itself
- By reading [the documentation](https://www.npmjs.com/package/express), we can figure out how to use what is returned by  `require('express')`

1. Install it: `npm install express`
1. Create a file called server.js
1. Inside server.js, write the following

    ```javascript
    const express = require('express'); //from documentation: express is function
    const app = express();//app is an object

    app.listen(3000, ()=>{
        console.log("I am listening");
    });
    ```

1. Start the app by executing `node server.js` in the command line
1. Visit http://localhost:3000/ in your browser.  

You've successfully created a basic web server!  Later we will learn to serve JSON, static HTML files, and dynamic templated HTML files!

&#x1F535; **Activity**
```
* create a file server.js with the code above
* modify the app.listen code to return an array of something, like a grocery list
* 7 minutes
```

## Set up a basic GET route

Now we'll create a basic GET route so that visitors to (clients of) our web-server can retrieve some information from it

```javascript
const express = require('express'); //from documentation: express is function
const app = express();//app is an object

app.get('/somedata', (request, response) => {
    response.send('here is your information');
});

app.listen(3000, () => {
    console.log("I am listening");
});
```

- The function passed as a second parameter to `app.get()` is executed each time a user (client) goes to http://localhost:3000/somedata
- The function (callback) takes two parameters
    - `request`
        - object containing information about the request made (browser, ip, query params, etc)
    - `response`
        - object containing methods for sending information back to the user (client)
- We call `.send` on our response parameter, and the Express library automatically constructs an HTTP request with our parameter in the body. 

&#x1F535; **Activity**
```
* modify your file server.js with the code above
* modify the app.get code to listen for requests to '/rappers' 
* modify the code to return an array of rappers
* 7 minutes
```

## Use nodemon to restart your sever when your code changes

An NPM package called `nodemon` that uses `node` to run JS code, and it will restart the application whenever code in the application's directory is changed. So you don't need to restart the server everytime you change something!

1. Install it `npm install nodemon -g`
    - the `-g` tells npm to make the package available for use in the terminal in any directory (globally)
    - this overrides the 'encapsulated' default way node saves packages, and we use this for when a package isn't for a specific project, but for all of our projects!
1. Now we can call `nodemon server.js`, and the server will restart whenever the app's code changes

We can also edit package.json so that we don't need specify the script that we're going to run.  Do one of the following:

- After doing `npm init`
    - when it says `entry point: (index.js)`, specify which file you want to use (e.g. server.js)
- Edit package.json
    - where it says `"main": "index.js",` change the file name (e.g. server.js)

Now we can simply run `nodemon` without specifying the file name

![](https://media.giphy.com/media/Mp4hQy51LjY6A/giphy.gif)
