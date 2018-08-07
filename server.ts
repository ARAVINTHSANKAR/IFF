import * as express from 'express';
import * as bodyParser from 'body-parser';


import {routeHandler} from './controllers/routeHandler';

const app: express.Application = express();
const port: number = 8080;

app.use(bodyParser.json());
app.get('/readFile', routeHandler);

app.listen(port, () => {
    console.log(`port listening in : ${port}`);
})