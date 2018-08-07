import { Router, Request, Response } from 'express';
import { excelReader } from '../service/excelReader';

const router: Router = Router();

router.get('/readFile', async (req: Request, res: Response) => {

    var excelReaderObj: excelReader = new excelReader();
    var dataFromFile = await excelReaderObj.readFile();
    console.log("dataFromFile");
    console.log(dataFromFile);
    console.log("dataFromFile");
    res.send(dataFromFile);
});

export const routeHandler: Router = router;