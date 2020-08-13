import router from './app';
import * as express from 'express';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { secretObj } from '../config/config';

const morgan = require('morgan');
const {stream} = require('../config/logger')
const jwt = require('jsonwebtoken');

const app = express();
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(morgan('combined', {stream}));

app.set('views', path.join(__dirname, '/views'))
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get('/login', (request: express.Request, response: express.Response) => { 
	response.render('login');
});

app.get('/forgot-password', (request: express.Request, response: express.Response) => { 
	response.render('forgotPassword');
});

app.post('/login', router);

app.use('/*', (req, res, next) => {
	const token = req.cookies.token;
	try {
		jwt.verify(token, secretObj.secret);
		next();
	} catch {
		res.redirect('/login');
	}
})

app.use('/', router);

app.get('/', (req: express.Request, res: express.Response) => { 
	res.render('dashboard');
});

const server = app.listen(3000, () => console.log(`start`));

export default server
