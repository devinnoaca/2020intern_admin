import router from './app';
import * as express from 'express';
import db from './db';
import * as path from 'path';

const app = express();
app.use('/', router);

db.init();

app.set('views', path.join(__dirname, '/views'))
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get('/', (request: express.Request, response: express.Response) => { 
	// response.send('Hello World!');
	response.render('dashboard');
});

app.get('/user', (request: express.Request, response: express.Response) => { 
	response.render('usermanage');
});

app.listen(3000, () => console.log(`start`));