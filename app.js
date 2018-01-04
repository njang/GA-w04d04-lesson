const express = require('express')
const app = express()

// app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/kittens', (req, res) => res.send('Hello Kittens!'))
// app.get('', (req, res) => res.send(input))

// app.listen(3000, () => console.log('Example app listening on port 3000!'))


const webPages = [
  {
    url: "/kittens",
    name: "Picture of Kittens",
    imageLink: "https://metrouk2.files.wordpress.com/2017/07/187144066.jpg?w=748&h=498&crop=1"
  },
  {
    url: "/puppies",
    name: "Picture of Puppies",
    imageLink: "http://www.justpuppies.net/images/pom_triple_0815.jpg"
  },
  {
    url: "/ferrets",
    name: "Picture of Ferrets",
    imageLink: "https://listverse.com/wp-content/uploads/2013/12/colours.jpg"
  }
];

let mainPageLinks = "";

// for (let i = 0; i < webPages.length; i++) {
//   mainPageLinks = mainPageLinks + "<a href=" + webPages[i].url + ">" + webPages[i].name + "</a><br>";
// }

app.get('/', (req, res) => {
  res.send(mainPageLinks);
})

for (let i = 0; i < webPages.length; i++) {
  app.get(webPages[i].url, (req, res) => res.send('<img src=' + webPages[i].imageLink + '><br>' + mainPageLinks));
}


app.listen(3000, () => console.log('Kittens!'));
