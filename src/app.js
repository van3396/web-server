const chalk = require("chalk");
// Express is just a function to call a new express application
const express = require("express");
const hbs = require("hbs");
const { geocode, forecast } = require("../utils");

// Core module, no need to install it
const path = require("path");

// Dirname and filename is provided by the wrapper function

// Path to directory current file/script lives in
// console.log(__dirname)

// Path to directory file lives in
// console.log(__filename)
// Generates a path to whichever folder you want to go into
// console.log(path.join(__dirname, '../public'))

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
// app.use is a way to customize ther server
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "My Weather App",
    name: "Qui Van",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Qui Van",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Qui Van",
    message: "Welcome to the help page.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 Help",
    name: "Qui Van",
    message: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Qui Van",
    message: "Page not found.",
  });
});

// To start the server up
app.listen(3000, () => {
  console.log(chalk.magenta("Dancing on PORT 3000"));
});

/* 
app.com 
    - lets say we own the domain name
    - this will be a route
*/
// app.get("", (request, response) => {
//   response.send("<h1>Home page</h1>");
// });
//  this file will never run beause of the static call we have on line 22
// let us configure what the server should do when somone tries to get the resources at the specific route.
// - for example send back html or json
// you can also send it in html form inside quotes

/*
    app.com/help
    - this is another page on the site
    - this will be a another route
    */
// app.get("/help", (req, res) => {
//   res.send({
//       name: 'Qui',
//       age: 35
//   });
//   // sends a json response back in a stringfy version
//   // sends same with an array
// });

/*
app.com/about
    - this is another page on the site
    - this will be a another route
*/
// app.get("/about", (req, res) => {
//   res.send('<h1>About Page</h1>');
//     //send a raw stringify version of an array
// });

/*
app.com/weather
    - this is another page on the site
    - this will be a another route
*/
