//load environment variables
require('dotenv').config()

//grab dependencies
var express = require('express'),
  app      = express(),
  port     = process.env.PORT || 8080,
  expressLayouts     = require('express-ejs-layouts'),
  mongoose     = require('mongoose'),
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  flash          = require('connect-flash'),
  expressValidator = require('express-validator');

//configure application

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 60000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}))
app.use(flash())

//tell express where to look for static assets
app.use(express.static(__dirname + '/public')) // look for css
app.use(expressLayouts) //look in views/layout.ejs

//connect to MongoDB
mongoose.connect(process.env.DB_URI)

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator())

//set ejs as templating engine
app.set('view engine', 'ejs')

//set routes
app.use(require('./app/routes'))

//start server
app.listen(port, () => {
  console.log(`App is starting on ${port}`)
})
