"use strict";
exports.__esModule = true;
var fs = require("fs");
var mongodb = require("mongodb");
var es6_promise_1 = require("es6-promise");
var Excel = require('exceljs');
var config_1 = require("../config");
var excelReader = /** @class */ (function () {
    function excelReader() {
    }
    excelReader.prototype.uploadTemplate = function () {
        var promise = new es6_promise_1.Promise(function (resolve, reject) {
            var data = fs.readFileSync('D:\\IFF\\POC\\ExcelReadWrite\\template.xlsx');
            var insert_data = {};
            var collection = config_1.db.collection('template');
            var Binary = mongodb.Binary;
            insert_data.file_data = new Binary(data);
            collection.insert(insert_data, function (err, result) {
                if (err) {
                    reject('Upload Failed');
                }
                else {
                    resolve('Upload Success');
                }
            });
        });
        return promise;
    };
    excelReader.prototype.writeFileToLocal = function () {
        var promise = new es6_promise_1.Promise(function (resolve, reject) {
            var collection = config_1.db.collection('template');
            collection.findOne({}, function (err, data) {
                if (err)
                    console.error(err);
                else
                    console.log(data);
                fs.writeFile('downloadedForm.xlsx', data.file_data.buffer, function (err) {
                    if (err)
                        reject('Error in Downloading Template');
                    else {
                        var excelReaderObj = new excelReader();
                        excelReaderObj.updateFile().then(function (val) {
                            resolve('Update Success');
                        }, function (err) { return reject('Update failed'); });
                    }
                });
            });
        });
        return promise;
    };
    excelReader.prototype.updateFile = function () {
        var promise = new es6_promise_1.Promise(function (resolve, reject) {
            var workbook = new Excel.Workbook();
            workbook.xlsx.readFile('D:\\IFF\\POC\\ExcelReadWrite\\downloadedForm.xlsx')
                .then(function () {
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
                workbook.xlsx.writeFile('updatedForm.xlsx');
                resolve('Template updated successfully');
            });
        });
        return promise;
    };
    return excelReader;
}());
exports.excelReader = excelReader;
