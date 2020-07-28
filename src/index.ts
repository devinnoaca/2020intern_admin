import router from './app';
import * as express from 'express';
import db from './db';

const app = express();
app.use('/', router);

db.init();

app.get('/', (request: express.Request, response: express.Response) => { 
	response.send('Hello World!');
});
app.listen(3000, () => console.log(`start`));