const chalk = require("chalk");
const express = require("express");
//express is just a function to call a new express application

const path = require("path");
// core module, no need to install it

// dirname and filename is provided by the wrapper function
// console.log(__dirname)
// path to directory current file/script lives in
// console.log(__filename)
// path to directory file lives in

// console.log(path.join(__dirname, '../public'))
// generates a path to whichever folder you want to go into

// app.use is a way to customize ther server

const app = express();
const publicPath = path.join(__dirname, "../public");
// const aboutPath = path.join(__dirname, '../public/about')
// const helpPath = path.join(__dirname, '../public/help')

app.set("view engine", "hbs");
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "My Weather App",
    name: "Qui Van",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
      title: 'About Me',
      name: 'Qui Van'
  });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Qui Van',
        message: 'Welcome to the help page.'
        
    })
})

app.get("/weather", (req, res) => {
  res.send({
    forecast: "Not a cloud in the sky",
    location: "Florida",
  });
});

//to start the server up
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
