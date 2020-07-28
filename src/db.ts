import * as mysql from 'mysql2';
import { dbConfig } from '../config/db.config';

const connection = mysql.createConnection(dbConfig);

const init = () => {
	const strCreateUserTableQuery = `
CREATE TABLE User(\
usn INT NOT NULL,\
email VARCHAR(30) NOT NULL,\
pw VARCHAR(30) NOT NULL,\
name VARCHAR(20) NOT NULL,\
image VARCHAR(255),\
description VARCHAR(1000),\
company VARCHAR(1000),\
notificationCount INT,\
authorization BOOL NOT NULL,\
permission INT NOT NULL,\
PRIMARY KEY(usn));`;

	const strCreateCategoryTableQuery = `
CREATE TABLE Category(\
id INT NOT NULL,\
name VARCHAR(100),\
PRIMARY KEY(id));`;

	const strCreateKeywordTableQuery = `
CREATE TABLE Keyword(\
id INT NOT NULL,\
name VARCHAR(100),\
categoryID INT,\
PRIMARY KEY(id),\
FOREIGN KEY(categoryID)\
REFERENCES Category(id)\
ON DELETE CASCADE\
ON UPDATE CASCADE);`;

  connection.query(
			strCreateUserTableQuery +
			strCreateCategoryTableQuery +
			strCreateKeywordTableQuery,
		(error) => {
			if (error.errno === 1050) {
				console.log('Tables are already created');
			} else if (error){
				console.log('Unexpected Error');
		 	} else {
				console.log('Tables create success');
			};
		}
	);
};

export default {
	connection,init,
};
