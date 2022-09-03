const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MAX_AGE = 1000 * 60 * 60 * 30;
const port = 5000;

const uri = `mongodb+srv://admin:yjIRRFgGTsSI6rnh@cluster0.qshxzhv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const database = client.db('crud');

const mongoDBstore = new MongoDBStore({
  uri: uri,
  databaseName: 'crud',
  collection: 'mySessions',
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'a1s2d3f4g5h6',
    name: 'session-id', // cookies name to be put in "key" field in postman
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
      sameSite: false,
      secure: false, // to turn on just in production
    },
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(express.static(path.join('/Users/cy/Desktop/CRUD/client/build')));

app.get('/api/fail', (req, res) => {
  res.send({ fail: 'fail' });
});

app.get('/api/isAuth', async (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    return res.json(req.session.user);
  } else {
    return res.status(401).json('unauthorize');
  }
});

// app.post("/api/data", passport.authenticate('local', {failureRedirect : '/fail'}), (req,res) => {
//     res.redirect('/')
// });

// const user = await UserSchema.findOne({ email }) // finding user in db
// if (user) return res.status(400).json({ msg: 'User already exists' })

// const newUser = new UserSchema({ email, password })
// has
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: '이메일계정과 비밀번호를 입력하세요' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ msg: '이메일형식이 올바르지 않습니다' });
  }

  const user = await database.collection('userDB').findOne({ email: email });
  if (!user) {
    return res.status(400).json({ msg: '계정이 존재하지 않습니다' });
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (matchPassword) {
    const userSession = { email: user.email };
    req.session.user = userSession;

    return res.status(200).json({ msg: '로그인 했습니다.', userSession }); // attach user session id to the response. It will be transfer in the cookies
  } else {
    return res.status(400).json({ msg: '비밀번호가 일치하지 않습니다.' });
  }
});

app.get('/', function (req, res) {
  res.sendFile(path.join('/Users/cy/Desktop/CRUD/client/build/index.html'));
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: '이메일계정과 비밀번호를 입력하세요' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ msg: '이메일형식이 올바르지 않습니다' });
  }

  if (password.length < 7) {
    return res
      .status(400)
      .json({ msg: 'Password should be at least 8 characters long' });
  }

  const user = await database.collection('userDB').findOne({ email });
  if (user) {
    return res.status(400).json({ msg: '계정이 이미 존재합니다' });
  } else {
    const newUser = { email: email, password: password };
    bcrypt.hash(password, 7, async (err, hash) => {
      if (err)
        return res.status(400).json({ msg: 'error while saving the password' });

      newUser.password = hash;
      const savedUserRes = await database
        .collection('userDB')
        .insertOne(newUser);

      if (savedUserRes)
        return res.status(200).json({ msg: '회원가입 하셨습니다' });
    });
  }
});

app.delete('/api/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) throw error;

    res.clearCookie('session-id');
    res.status(200).send('Logout Success');
  });
});

app.post('/api/task', async(req,res) => {
  await database.collection('TodoDB').insertOne(req.body);
})

app.get('/api/tasks', async(req,res) => {
  const task = await database.collection('TodoDB').find({email : req.session.user.email}).sort({"createdAt" : -1})
  const taskArray = await task.toArray();
  res.json(taskArray)
})

app.delete('/api/task', async(req,res) =>{
  console.log(req.body)
  const task = await database.collection('TodoDB').deleteOne({text : req.body.text})
})

// app.get('*', function (req, res) {
//   res.sendFile(path.join('/Users/cy/Desktop/CRUD/client/build/index.html'));
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
