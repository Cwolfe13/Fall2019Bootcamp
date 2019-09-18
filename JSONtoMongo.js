'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Global variables */
//Create an array for listingData
var listingData = [];

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
mongoose.connect(config.db.uri, {useNewUrlParser: true});

/*
    Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
    */
fs.readFile('listings.json', 'utf8', function(err, data) {
    //Parse data from json
    listingData = JSON.parse(data);
    //Check for errors
    if (err) throw err;
    //Attempt to get each element from entries and model
    listingData.entries.forEach(function(element) {
        //Make a variable that holds the model exported from ListingSchema
        var Listings = Listing;
        //Create a variable that will hold each listing in the for loop. Each listing is located in element
        //Element is put into the model, which is then saved in the temp variable
        var templisting = new Listings(element);
        //Now we save that temporary variable to the database.
        templisting.save(function (err) {
            if (err) throw err;
        })
    })
});
/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  //Read in the file
  */

/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */