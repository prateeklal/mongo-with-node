var express = require('express');
var engines = require('consolidate');
var MongoClient = require('mongodb');
var assert = require('assert');

var app = express();

// Setting up the application
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Start the MongoClient server request
// Used a video document which contains a movie collection with the list of movies.
MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {
  // Error Handler
  assert.equal(null, err);
  // Connection succesfull
  console.log('Succesfully connected to MongoDB');

  // Serving the app at the root
  app.get('/', function(req, res) {

    // Fetching the movies collection in the database
    db.collection('movies').find({}).toArray(function(err, docs) {
      // Displaying the results in the movies template
      res.render('movies', {'movies': docs});
    });
  });
  // Status 404 for all irrelevant view requests
  app.use(function(req,res) {
    res.sendStatus(404);
  });

  // Start the server
  var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log("Express server listening on port %s", port);
  });

});
