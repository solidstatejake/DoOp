const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const log = console.log;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'do-op';

MongoClient.connect(connectionURL, { useNewURLParser: true}, (error, client) => {
  if(error) { return log("ERROR"); }

  log('Database connection successful.');
});