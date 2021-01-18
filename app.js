//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Cricket was introduced to India by British sailors in the 18th century, and the first cricket club was established in 1792. India's national cricket team did not play its first Test match until 25 June 1932 at Lord's, becoming the sixth team to be granted test cricket status. From 1932 India had to wait until 1952, almost 20 years for its first Test victory. In its first fifty years of international cricket, India was one of the weaker teams, winning only 35 of the first 196 Test matches it played. The team, however, gained strength in the 1970s with the emergence of players such as batsmen Gavaskar, Viswanath, Kapil Dev, and the Indian spin quartet..";
const aboutContent = "Cricket was introduced to India by British sailors in the 18th century, and the first cricket club was established in 1792. India's national cricket team did not play its first Test match until 25 June 1932 at Lord's, becoming the sixth team to be granted test cricket status. From 1932 India had to wait until 1952, almost 20 years for its first Test victory. In its first fifty years of international cricket, India was one of the weaker teams, winning only 35 of the first 196 Test matches it played. The team, however, gained strength in the 1970s with the emergence of players such as batsmen Gavaskar, Viswanath, Kapil Dev, and the Indian spin quartet..";
const contactContent = "BOARD OF CONTROL FOR CRICKET IN INDIA 4th Floor, Cricket Centre Wankhede Stadium ‘D’ Road, Churchgate Mumbai- 400020 India.";

const app = express();

const lod_ash = require('lodash');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin-neeraj:Pass@1270@cluster0.izwwm.mongodb.net/Ejs_blog',{useNewUrlParser: true, useUnifiedTopology : true});

const post_Schema = new mongoose.Schema({
  title: String,
  body : String
});

const post_coll = mongoose.model('post', post_Schema);

app.get('/',function(req,res){
  post_coll.find({}, function(err,data){
    if(!err){
      res.render('home',{para1:homeStartingContent,posts:data })
    }
    else{
      console.log(err);
    }
  });
});

app.get('/about',function(req,res){
  res.render('about',{para1:aboutContent});
});
app.get('/contact',function(req,res){
  res.render('contact',{para1:contactContent});
});


app.get('/compose', function(req,res){
  res.render('compose',{});
});

app.post('/compose',function(req,res){
   const title_i =  lod_ash.lowerCase(req.body.name1);
   const body_i = req.body.name2;

   const new_doc = new post_coll({
     title : title_i,
     body : body_i
   });
   new_doc.save();
   res.redirect('/');
});


app.get('/posts/:para',function(req,res){
  const post_id = req.params.para;
  post_coll.findOne({_id:post_id},function(err,data){
    if(!err){
      res.render('post',{post:data});
    }
  });

});






//process.env.PORT



app.listen(process.env.PORT, function() {
  console.log("Server started on port 3000");
});
