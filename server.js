const express = require('express'); //from documentation: express is function
const app = express();//app is an object

app.get('/somedata', (request, response) => {
    response.send('here is your information');
    console.log(request);
});

app.listen(3000, ()=>{
    console.log("I am listening");
});