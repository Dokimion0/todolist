const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const port = 5000;
const passport =require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const uri = `mongodb+srv://admin:yjIRRFgGTsSI6rnh@cluster0.qshxzhv.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri);
const database = client.db("crud");
const userDB = database.collection("userDB");



let data =''


app.use(bodyParser.json());
app.use(express.urlencoded({extended: true})) 
app.use(session({secret : 'code', resave : true, saveUninitialized : false}));
app.use(passport.initialize());
app.use(passport.session()); 

app.get("/todo", (req,res)=>{
  res.send("hi")
})

app.post("/api/data", (req,res) => {
    console.log(req.body)
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true,
  passReqToCallback: false,
}, (email, password, done) => {
  //console.log(email, password);
  database.collection('userDB').findOne({ "email" : email }, (err, res) => {
    if (err) return done(err)

    if (!res) return done(null, false, { message: '존재하지않는 아이디요' })
    if (password == res.password) {
      return done(null, res)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

app.post("/api/add", (req, res) =>{
  console.log(req.body)
  database.collection("userDB").insertOne(req.body, (err, res) => {
    if(err) return console.log(err);
  })
})

// passport.serializeUser(function (user, done) {
//   done(null, user.email)
// });

// passport.deserializeUser(function (email, done) {
//   done(null, {})
// }); 


app.listen(port, () => console.log(`Listening on port ${port}`))


