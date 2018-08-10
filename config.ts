import * as mongodb from 'mongodb';

var MongoClient = mongodb.MongoClient;
var db: any;
MongoClient.connect('mongodb://localhost:27017/excelDataPOC', { useNewUrlParser: true }, function(err: Error, dbClient: any) {
  if(err) { 
    console.log("connection failed");
  } else {
    console.log("Connection success");
    db = dbClient;
  }
});

export { db };