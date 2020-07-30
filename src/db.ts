import * as mysql from 'mysql2';
import { dbConfig } from '../config/db.config';
<<<<<<< HEAD
 
const connection = mysql.createConnection(dbConfig);

const init = () => { 

=======

const connection = mysql.createConnection(dbConfig.conf);
>>>>>>> develop

// 로컬 환경 DB 사용시 initialize
if (dbConfig.branch === 'LOCAL') {
(() => {
	const strDropTables	= `
DROP TABLE Career; DROP TABLE Keyword; DROP TABLE User; DROP TABLE Category;
`
	const strCreateUserTable = `
CREATE TABLE User(\
usn INT NOT NULL AUTO_INCREMENT,\
id VARCHAR(20) NOT NULL,\
email VARCHAR(30) NOT NULL,\
password VARCHAR(30) NOT NULL,\
name VARCHAR(20) NOT NULL,\
image VARCHAR(255),\
description VARCHAR(1000),\
notificationCount INT,\
authorization BOOL NOT NULL,\ 
permission INT NOT NULL,\
type BOOL NOT NULL,\
PRIMARY KEY(usn));`;
	const strInsertUser = `
INSERT INTO USER(\
usn, id, email, password, name, image, description, \
notificationCount, authorization, permission, type) \
VALUES (1, "tjdkskgnal", "tjdkskgnal61@gmail.com", "1234", "SeongJae",\
"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1m48JDx5jGrVvmMnYqr8zte_LCfe6dI6MFw&usqp=CAU",
"Hi, I'm SeongJaeSong", 0, 1, 2, true);`;

	const strCreateCategoryTable = `
CREATE TABLE Category(\
id INT NOT NULL AUTO_INCREMENT,\
name VARCHAR(100),\
PRIMARY KEY(id));`;
	const strInsertCategory = `
INSERT INTO CATEGORY(id, name) \
VALUES (1, "Security");`;

	const strCreateKeywordTable = `
CREATE TABLE Keyword(\
id INT NOT NULL AUTO_INCREMENT,\
name VARCHAR(100),\
categoryID INT,\
PRIMARY KEY(id),\
FOREIGN KEY(categoryID)\
REFERENCES Category(id)\
ON DELETE CASCADE \
ON UPDATE CASCADE);`;
	const strInsertKeyword = `
INSERT INTO KEYWORD(id, name, categoryID) \
VALUES(1, "SQL Injection", 1);`;
	const strInsertKeyword2 = `
INSERT INTO KEYWORD(id, name, categoryID) \
VALUES(2, "XSS", 1);`;

	const strCreateCareerTable = `
CREATE TABLE Career(\
id INT NOT NULL AUTO_INCREMENT,\
career VARCHAR(500),\
usn INT,
PRIMARY KEY(id),\
FOREIGN KEY(usn)\
REFERENCES User(usn)\
ON DELETE CASCADE \
ON UPDATE CASCADE);`;
	const strInsertCareer = `
INSERT INTO Career(id, career, usn) \
VALUES(1, "NAVER - CTO", 1);`;

	connection.query(
		strDropTables, (error: mysql.Error) => {
			console.log('Table dropping...');
			if (error) {
				console.log('Unexpected Error\n' + error);
			} else {
				console.log('Tables are dropped');
			};
		}
	);

  connection.query(
			strCreateUserTable
			+strCreateCategoryTable
			+strCreateKeywordTable
			+strCreateCareerTable
			,(error: mysql.Error) => {
			console.log('Table creating...');
			if (error){
				if (error.errno === 1050){
					console.log('Tables are already exist');
				}
				console.log('Unexpected Error\n' + error);
			} else {
				console.log('Tables create success');
			};
		}
	);

	connection.query(
		strInsertUser
		+strInsertCategory
		+strInsertKeyword
		+strInsertKeyword2
		+strInsertCareer
		,(error: mysql.Error) => {
			console.log('Data inserting...');
			if (error) {
				console.log('Unexpected Error\n' + error);
			} else {
				console.log('Data inserted!');
			};
		}
	);
})();
}

export default {
	connection
};
