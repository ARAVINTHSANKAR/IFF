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

export const routeHandler: Router = router;