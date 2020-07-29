import router from './app';
import * as express from 'express';
import db from './db';
import * as path from 'path';

const app = express();
app.use('/', router);

db.init();

app.set('views', path.join(__dirname, '/Views'))
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/Public'));

app.get('/', (req: express.Request, res: express.Response) => { 
	res.render('dashboard');
});
app.listen(3000, () => console.log(`start`));