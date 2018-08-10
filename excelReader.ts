import * as fs from 'fs';
import * as mongodb from 'mongodb';
import {Promise} from 'es6-promise'
var Excel = require('exceljs');


import { db } from '../config';

export class excelReader {

    public uploadTemplate() {

        let promise = new Promise( function(resolve, reject) {
            
            let data: Buffer = fs.readFileSync('D:\\IFF\\POC\\ExcelReadWrite\\template.xlsx');
            let insert_data: any = {};
            let collection = db.collection('template');
            var Binary = mongodb.Binary;

            insert_data.file_data = new Binary(data);        
            collection.insert(insert_data, (err: Error, result: any) => {
                if(err) { reject('Upload Failed'); }
                else { resolve('Upload Success'); }
            });
        });
        return promise;
    }

    public writeFileToLocal() {

        let promise = new Promise( function(resolve, reject) {

            var collection = db.collection('template');
            collection.findOne({}, function(err: any, data:any) {
                if (err) console.error(err);
                else console.log(data);
                fs.writeFile('downloadedForm.xlsx', data.file_data.buffer, function(err) {
                    if (err) reject('Error in Downloading Template');
                    else {
                        var excelReaderObj = new excelReader();
                        excelReaderObj.updateFile().then(
                            (val) => {
                                resolve('Update Success')
                            },
                            (err) => reject('Update failed')
                        ) ;
                    }
                });
            });

        });
        return promise;
    }

    public updateFile() {

        let promise = new Promise( function(resolve, reject) {
        
            var workbook = new Excel.Workbook();
            workbook.xlsx.readFile('D:\\IFF\\POC\\ExcelReadWrite\\downloadedForm.xlsx')
            .then(function() {
                    let worksheet = workbook.getWorksheet(1);

                    let row2 = worksheet.getRow(2);
                    row2.getCell(2).value = "20";
                    row2.getCell(3).value = "9486175156";
                    row2.getCell(4).value = "sivakasi";
                    row2.commit();
        
                    let row3 = worksheet.getRow(3);
                    row3.getCell(2).value = "18";
                    row3.getCell(3).value = "7894651327";
                    row3.getCell(4).value = "coimbatore";
                    row3.commit();
        
                    workbook.xlsx.writeFile('updatedForm.xlsx');
                    resolve('Template updated successfully')
            });
        });
        return promise;
    }
}
