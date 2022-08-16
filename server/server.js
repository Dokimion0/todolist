const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const port = 5000;

const uri = `mongodb+srv://admin:yjIRRFgGTsSI6rnh@cluster0.qshxzhv.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("todoapp");
    const post = database.collection("post");
    // create a document to insert
    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    const result = await post.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);




app.use(bodyParser.json());
app.use(express.urlencoded({extended: true})) 


app.get('/api', (req, res) => {
  res.send([
    {
      'id' : 1,
      'name' : 'kim',
    },
    {
      'id' : 2,
      'name' : 'lee',
    }
  ])
});

app.get("/", (req, res) =>{
  res.send({Message : "hello Express!"})
})

app.listen(port, () => console.log(`Listening on port ${port}`))


