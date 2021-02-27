const chalk = require("chalk");
const express = require("express");
//express is just a function to call a new express application

const app = express();

/* 
app.com 
    - lets say we own the domain name
    - this will be a route
*/
app.get("", (request, response) => {
  response.send("<h1>Home page</h1>");
});
// let us configure what the server should do when somone tries to get the resources at the specific route.
    // - for example send back html or json
    // you can also send it in html form inside quotes

/*
    app.com/help
    - this is another page on the site
    - this will be a another route
    */
app.get("/help", (req, res) => {
  res.send("Help page");
});

/*
app.com/about
    - this is another page on the site
    - this will be a another route
*/
app.get("/about", (req, res) => {
  res.send("About page");
});

/*
app.com/weather
    - this is another page on the site
    - this will be a another route
*/
app.get("/weather", (req, res) => {
  res.send("Weather page");
});

//to start the server up
app.listen(3000, () => {
  console.log(chalk.magenta("Dancing on PORT 3000"));
});
