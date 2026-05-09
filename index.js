const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://simple_crud:37OlGbCYE50miKOU@cluster-ardi.8lva6gn.mongodb.net/?appName=Cluster-Ardi";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const run = async ()=>{
  try{
    await client.connect();

    app.get('/users', async (req, res)=>{
      const db = client.db('simple_crud_db');
      const users = db.collection('users');
      const cursor = users.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  finally{
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('Hello from Home')
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})