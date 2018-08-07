var Excel = require('exceljs');

export class excelReader {
    public readFile() {
        
        var workbook = new Excel.Workbook();
        workbook.xlsx.readFile('D:\\IFF\\POC\\ExcelReadWrite\\excelFile\\pocExcel.xlsx')
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

                return workbook.xlsx.writeFile('new.xlsx');
            });
    }
}