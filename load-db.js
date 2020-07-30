/****************************************************/
// Populate database from json file: countries and capital cities //
/***************************************************/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); 

const fs = require('fs');

const url = 'mongodb://localhost:27017'; // mongodb Connection URL
const dbName = 'ex4'; // Database Name
 


// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    
    assert.equal(null, err);
    console.log("Connected successfully to MongoDB server");
        
    const db = client.db(dbName);

    fs.readFile('capitals.json', (err, data) => {
        
        if (err) throw err;
        let capitals = JSON.parse(data);    // read data from json file
            
        const collection = db.collection('countries');      // Get the countries collection
        collection.insertMany(capitals, function(err, result) {  // Insert documents
            assert.equal(err, null);
            console.log(result);
        });        
    
    });

});
