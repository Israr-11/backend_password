const express = require("express");
const cors = require("cors");
const loginRoute = require("./Route/routerLogin");
const registerRoute = require("./Route/routerRegister")
const storeRoute = require("./Route/routerSaver")
const searchRoute = require("./Route/searchRoute")

const databaseConnection = require("./Services/connectDB")

//Calling dependencies
databaseConnection();
const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });



//Middleware
app.use("/login", loginRoute)
app.use("/welcome", registerRoute)
app.use("/register", registerRoute)
app.use("/saver", storeRoute)
app.use("/searcherapi", searchRoute)



//Litening at port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})
