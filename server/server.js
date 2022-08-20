const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const port = 5000;
const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const uri = `mongodb+srv://admin:yjIRRFgGTsSI6rnh@cluster0.qshxzhv.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri);
const database = client.db("crud");
const userDB = database.collection("userDB");



let data =''


app.use(bodyParser.json());
app.use(express.urlencoded({extended: true})) 
app.use(session({
  secret : 'code', 
  resave : true, 
  saveUninitialized : true,
  cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }, // 4 hours
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(express.static(path.join('/Users/cy/Desktop/CRUD/client/build')));

app.get("/api/fail", (req,res)=>{
  res.send({hi : "hi"})
})


app.post("/api/data", passport.authenticate('local', {failureRedirect : '/'}), (req,res) => {
    res.redirect('/fail')
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true,
  passReqToCallback: false,
}, (email, password, done) => {
  console.log('form', email, password);
  database.collection('userDB').findOne({ email : email }, (err, res) => {
    if (err) return done(err) 
    
    if (!res) return done(null, false, { message: '존재하지않는 아이디요' })
    if (password == res.password) {
      return done(null, res)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

passport.serializeUser(function (user, done) {
  console.log(user)
  done(null, user)
});

passport.deserializeUser( (id, done)=> {
  console.log('de-serialize', id);
  done(null, id);
})


app.get('/', function (req, res) {
  res.sendFile(path.join('/Users/cy/Desktop/CRUD/client/build/index.html'));
});



app.post("/api/add", (req, res) =>{
  console.log(req.body)
  database.collection("userDB").insertOne(req.body, (err, res) => {
    if(err) return console.log(err);
  })
})

passport.serializeUser(function (user, done) {
  done(null, user.email)
});

passport.deserializeUser(function (email, done) {
  done(null, {})
}); 


// app.get('*', function (req, res) {
//   res.sendFile(path.join('/Users/cy/Desktop/CRUD/client/build/index.html'));
// });

app.listen(port, () => console.log(`Listening on port ${port}`))


