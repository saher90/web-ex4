const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT=process.env.PORT || 5000
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); 
const url =  process.env.MONGODB_URI || 'mongodb://localhost:27017'; // mongodb Connection URL
const dbName = 'heroku_9200wlz6'; // Database Name




// Use connect method to connect to the server
MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, client) {
    
   assert.equal(null, err);
    console.log("Connected successfully to server");
    
    const db = client.db(dbName);
    console.log(url)

    app.listen(PORT, function () {
        console.log('Node server is running on port 5000...');
    });
    app.use(express.static(path.resolve(__dirname, 'client', 'public')));
    app.use(express.urlencoded()); // Parse URL-encoded bodies

    app.get('/', function (req, res) {
        fs.createReadStream('./client/index.html').pipe(res);
    });

    app.post('/', (req, res) => {    
        
        var searchBar = {"name":req.body.name};
            
            // Find all documents
            
            const collection = db.collection('countries');
             
            
           collection.find({ country :{$regex : searchBar.name,$options:'i'}},{country: 1, city: 0,_id :0}).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found the following records");
                var array=[]
                docs.forEach(element => {
                    array.push(element.country)
                });
                res.send(array)
            })            
           
    })

});