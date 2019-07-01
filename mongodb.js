const { MongoClient, ObjectID } = require('mongodb');
const log = console.log;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'do-op';

const id = new ObjectID();

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

  // Handle database connection
  if (error) return log("ERROR! Unable to connect to database.\n", error);
  log("Connection to database ", databaseName, " successful.");

  // Begin database handling

  const db = client.db(databaseName);

  db.collection('users').find({ age: 27}).toArray((error, users) => {
    const jake = users[0];
    db.collection('users').updateOne({
      _id: jake._id
    }, {
      $set: {
        name: 'Alfonse'
      }
    }).then((result) => {
      log(result)
    }).catch((error) => {
      log(error)
    })
  });

});

