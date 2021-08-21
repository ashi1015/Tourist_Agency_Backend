const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require("cors");
//require("dotenv").config();
const bodyParser = require('body-parser');

//setting up route information


// setting-up express
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// setting-up mongoose
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection Established");
    }

);

//setting-up routes
