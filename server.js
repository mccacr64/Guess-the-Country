const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const cors = require("cors") //my api requests were restricted due to cors this should fix
const connectDB = require("./config/database");
// Routes
const mainRoutes = require("./routes/main");
const homeRoutes = require("./routes/home");
const postRoutes = require("./routes/posts");
const gamesRoutes = require("./routes/games");
const profileRoutes = require("./routes/profile");

//I'M ADDING THIS TO HOPEFULLY FIX API
app.use(cors())

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
// connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static(__dirname + "/public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/home", homeRoutes);
app.use("/post", postRoutes);
app.use("/profile", profileRoutes);
app.use("/games", gamesRoutes);


//Server Running
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running you better catch it!`);
  });
});