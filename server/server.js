const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const port = 5000;
// const session = require('express-session');

const uri = `mongodb+srv://admin:yjIRRFgGTsSI6rnh@cluster0.qshxzhv.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri);
const database = client.db("crud");


app.use(bodyParser.json());
app.use(express.urlencoded({extended: true})) 
// app.use(session({
//   secret : 'code', 
//   resave : true, 
//   saveUninitialized : true,
//   cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }, // 4 hours
// }));

app.use(express.static(path.join('/Users/cy/Desktop/CRUD/client/build')));

app.get("/api/fail", (req,res)=>{
  res.send({fail : "fail"})
})


// app.post("/api/data", passport.authenticate('local', {failureRedirect : '/fail'}), (req,res) => {
//     res.redirect('/')
// });



// const user = await UserSchema.findOne({ email }) // finding user in db
// if (user) return res.status(400).json({ msg: 'User already exists' })

// const newUser = new UserSchema({ email, password })
// has
app.post("/api/data", (req, res) => {
  
})

app.get('/', function (req, res) {
  res.sendFile(path.join('/Users/cy/Desktop/CRUD/client/build/index.html'));
});



app.post("/api/register", async (req, res) =>{
  const {email, password} = req.body
  if (!email || !password){
      return res.status(400).json({ msg: 'Password and email are required' })
  }

  if (password.length < 7) {
    return res
      .status(400)
      .json({ msg: 'Password should be at least 8 characters long' })
  }

  const user = await database.collection("userDB").findOne({email})
    if (user) {
      return res.status(400).json({msg : "계정이 이미 존재합니다"})
    }
    else{
      database.collection("userDB").insertOne(req.body)
      return res.status(200).json({msg : "회원가입 하셨습니다"})
    }
})




// app.get('*', function (req, res) {
//   res.sendFile(path.join('/Users/cy/Desktop/CRUD/client/build/index.html'));
// });

app.listen(port, () => console.log(`Listening on port ${port}`))


