import router from './app';
import * as express from 'express';
//import db from './db';
import * as path from 'path';

const app = express();
app.use('/', router);

//db.init();

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

app.get('/keyword', (request: express.Request, response: express.Response) => { 
	const data = [
        {
            category: '개발/프로그래밍', 
            keyword : ['java', 'javascript', 'python']
        },
        {
            category: '디자인', 
            keyword : ['html', 'CSS', 'SCSS']
        },
        {
            category: '데이터사이언스', 
            keyword : ['MongoDB', 'MySQL', 'MariaDB', 'SQL', 'RDBMS', 'Oracle', 'R']
        },
        {
            category: '업무스킬', 
            keyword : ['프로젝트 관리', '데이터 분석', '정보보안', 'VBA']
        },
    ];
	response.render('keyword', { data: data });
});

app.listen(3000, () => console.log(`start`));