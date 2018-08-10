import { Router, Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

import { excelReader } from '../service/excelReader';
import { db } from '../config';

const router: Router = Router();
var excelReaderObj: excelReader = new excelReader();


router.post('/uploadTemplate', (req: Request, res: Response) => {
    excelReaderObj.uploadTemplate().then(
        (val) => res.send(val),
        (err) => res.send(err)
    ) 
});

router.get('/updateForm', (req: Request, res: Response) => {
    excelReaderObj.writeFileToLocal().then(
        (val) => {
            res.sendFile(path.join(__dirname, 'updatedForm.xlsx'));
        },
        (err) => res.send(err)
    )
});

// done in lap

/*  router.get('/updateForm', (req: Request, res: Response) => {

    var rstream = fs.createReadStream("C:\\Users\\Aravinth sankar\\Desktop\\IFF\\POC\\excelReadWrite\\updatedForm.xlsx");
    res.writeHead(200, {'Content-Type': 'application/vnd.ms-excel'});
    rstream.pipe(res);
});  */

/* router.get('/updateForm', (req: Request, res: Response) => {
    var filename = "C:\\Users\\Aravinth sankar\\Desktop\\IFF\\POC\\excelReadWrite\\updatedForm.xlsx";
    fs.readFile(filename, function(err, data) {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        }  
        res.writeHead(200, {'Content-Type': 'application/vnd.ms-excel'});
        res.write(data);
        res.end();
      });
}) */


//


export const routeHandler: Router = router;
