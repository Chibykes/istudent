const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const cors = require('cors');
const {allowInsecurePrototypeAccess: AIPA} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');


const path = require('path');
dotenv.config({ path: './config/config.env' });
require('./config/db-connection')();
const publicPath = path.resolve(__dirname, 'src/public');
const port = process.env.PORT || 8080;
const uri = '0.0.0.0';

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: "keyword",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 2592000000
  },
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
    mongooseConn: mongoose.connection 
  })
}));

app.use(flash());

app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials',
    handlebars: AIPA(Handlebars)
}));

app.set('view engine', 'hbs');

app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
