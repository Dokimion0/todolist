const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const port = 5000;

const uri = `mongodb+srv://admin:yjIRRFgGTsSI6rnh@cluster0.qshxzhv.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri);
const database = client.db("crud");
const userDB = database.collection("userDB");

// async function run() {
//   try {
//         // const doc = {
//     //   title: "Record of a Shriveled Datum",
//     //   content: "No bytes, no problem. Just insert a document, in MongoDB",
//     // }
//     // await post.insertOne(doc);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);




app.use(bodyParser.json());
app.use(express.urlencoded({extended: true})) 



app.get("/api/test", (req, res) =>{
  database.collection("userDB").find().toArray((err, res) => {
    console.log(res)
    if(err) return console.log(err);
  })
})

app.post("/api/add", (req, res) =>{
  res.send({ppp : "hello Express!"})
  console.log(req.body)
  database.collection("userDB").insertOne(req.body, (err, res) => {
    if(err) return console.log(err);
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))


