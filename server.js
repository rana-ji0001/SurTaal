const app = require('./src/app');
require('dotenv').config();
const connectDB = require("./src/db/db");


connectDB();


app.listen(3000, (req,res) => {
    console.log("Server is Live on 3000");
})