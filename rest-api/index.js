const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {console.log("Connected to MongoDB")})
    .catch(err => {console.log(err)});

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Initialize express middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`)
})