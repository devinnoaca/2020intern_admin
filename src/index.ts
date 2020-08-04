import router from './app';
import * as express from 'express';
import db from './db';
import * as path from 'path';
import * as bodyparser from 'body-parser';

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use('/', router);

app.set('views', path.join(__dirname, '/views'))
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get('/', (req: express.Request, res: express.Response) => { 
	res.render('dashboard');
});

app.get('/login', (request: express.Request, response: express.Response) => { 
	response.render('login');
});

app.get('/forgot-password', (request: express.Request, response: express.Response) => { 
	response.render('forgot-password');
});

app.get('/notification', (req: express.Request, res: express.Response) => {
	const data = {
		'message' : 'OK',
		'notifications': [
			{
				'id' : 1,
				'type' : 'message',
				'receiver' : 'dlwlsrn94',
				'sender' : 'dlwsrln95',
				'creationTime' : '2020-08-03 12:00',
				'isChecked' : true
			},
			{
				'id' : 2,
				'type' : 'message',
				'receiver' : 'dlwlsrn94',
				'sender' : 'dlwsrln95',
				'creationTime' : '2020-08-03 12:00',
				'isChecked' : false
			},
			{
				'id' : 3,
				'type' : 'message',
				'receiver' : 'dlwlsrn94',
				'sender' : 'dlwsrln95',
				'creationTime' : '2020-08-03 12:00',
				'isChecked' : true
			},
		]
	};

	res.render('notification/notification', data);
});

app.listen(3000, () => console.log(`start`));
