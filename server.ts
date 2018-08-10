import * as express from 'express';
import * as formidable from 'formidable';
import * as bodyParser from 'body-parser';

import { routeHandler } from './controllers/routeHandler';
import { excelReader } from './service/excelReader';

const app: express.Application = express();
const port: number = 8080;

app.use(bodyParser.json());

app.post('/uploadTemplate', routeHandler);

app.get('/updateForm', routeHandler);

app.listen(port, () => {
    console.log(`port listening in : ${port}`);
});