const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(express.urlencoded({extended: true})) 

// app.use(express.static(path.join(__dirname, "client/build")));


// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname + "client/build/index.html"))
// })

// app.get('*', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'client/build/index.html'));
//   });


app.get("/api/hello", (req, res) =>{
  res.send({Message : "hello Express!"})
})

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`))