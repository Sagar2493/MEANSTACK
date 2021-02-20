const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post');

const postsRoutes = require("./routes/posts");
const app = express();

const DB_USER = 'Sagar24';
const PASSWORD = encodeURIComponent('Sagar@123');

const url = `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.3ytbz.mongodb.net/node_angular?retryWrites=true&w=majority`;

//const url = `mongodb://${DB_USER}:${PASSWORD}@cluster0-shard-00-00.3ytbz.mongodb.net:27017,cluster0-shard-00-01.3ytbz.mongodb.net:27017,cluster0-shard-00-02.3ytbz.mongodb.net:27017/node-angular?ssl=true&replicaSet=atlas-z26ao5-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log('Connected to database !!');
  })
  .catch((err)=>{
    console.log('Connection failed !!'+ err.message);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*'); //http://localhost:3000,
	res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers','*');
	res.setHeader('Access-Control-Allow-Credentials','true');
	next();
});

app.use("/api/posts", postsRoutes);
module.exports = app;
