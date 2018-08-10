import * as mongodb from 'mongodb';
import * as fs from 'fs';
var Excel = require('exceljs');

var MongoClient = mongodb.MongoClient;
var Binary = mongodb.Binary;

MongoClient.connect('mongodb://localhost:27017/excelDataPOC', { useNewUrlParser: true }, function(err: Error, db: any) {
  if(err) { 
    console.log("Please check you db connection parameters");
  } else {
    console.log("Connection success");
    // readFile(db);
    // writeFile(db);
    updateFile();
  }
});




var readFile = (db: any) => {
    var data = fs.readFileSync('D:\\IFF\\POC\\ExcelReadWrite\\template.xlsx');
    var insert_data: any = {};
    insert_data.file_data = new Binary(data);
    var collection = db.collection('template');
    collection.insert(insert_data, function(err: Error, result: any) {
        if(err) console.log(err);
        else console.log(result);
    });
}

var writeFile = (db: any) => {
    var collection = db.collection('template');
    collection.findOne({}, function(err: any, data:any) {
        if (err) console.error(err);
        else console.log(data);
        fs.writeFile('downloadedForm.xlsx', data.file_data.buffer, function(err){
            if (err) throw err;
            console.log('Sucessfully saved!');
        });
    })
}

var updateFile = () => {
    
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('D:\\IFF\\POC\\ExcelReadWrite\\downloadedForm.xlsx')
        .then(function() {

            var worksheet = workbook.getWorksheet(1);

            var row2 = worksheet.getRow(2);
            row2.getCell(2).value = "20";
            row2.getCell(3).value = "9486175156";
            row2.getCell(4).value = "sivakasi";
            row2.commit();

            var row3 = worksheet.getRow(3);
            row3.getCell(2).value = "18";
            row3.getCell(3).value = "7894651327";
            row3.getCell(4).value = "coimbatore";
            row3.commit();

            return workbook.xlsx.writeFile('updatedForm.xlsx');
        });
}