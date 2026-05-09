const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://<db_username>:<db_password>@cluster-ardi.8lva6gn.mongodb.net/?appName=Cluster-Ardi";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res)=>{
    res.send('Hello from Home')
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})