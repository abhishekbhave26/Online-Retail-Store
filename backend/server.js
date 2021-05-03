const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('custom-env').env();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uriConnStr = process.env.ATLAS_URI;
const app_env = process.env.APP_ENV;

if (app_env === undefined) {
  console.log("Please check if repo has .env.app_env files.");
  process.exit(1);
}

console.log("Running in " + app_env + " environment.");
mongoose.connect(uriConnStr, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;

//use gmail email id for mongo db
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const authenticateRouter = require('./routes/authenticate');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const contactRouter = require('./routes/contact');

app.use('/authenticate',authenticateRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = server;