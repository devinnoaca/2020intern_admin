import * as mysql from 'mysql2';
import { dbConfig } from '../config/db.config';

const connection = mysql.createConnection(dbConfig.conf);

// 로컬 환경 DB 사용시 initialize
if (dbConfig.branch === 'LOCAL') {
(() => {
	const strDropDB	= `  
DROP DATABASE test; CREATE DATABASE test; USE test`;

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
// authorization: 이메일 인증 여부
// permission: 권한(0: 일반유저, 1: 어드민, 2: 슈퍼)
// type: 분류(0(false): 멘티, 1: 멘토)

	const strInsertUser = `
INSERT INTO USER(\
usn, id, email, password, name, image, description, \
notificationCount, authorization, permission, type) \
VALUES (1, "ImMentor", "mentor@e.mail", "q1w2e3r4", "Edsger Wybe Dijkstra", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/600px-Edsger_Wybe_Dijkstra.jpg", "Go To Statement Considered Harmful", false, 1, 2, true), (2, "ImMentee", "mentee@e.mail", "1234", "Cho Ding Kim", "https://upload3.inven.co.kr/upload/2020/05/11/bbs/i13789520996.jpg", "I wanna be a adult!!!", false, 1, 0, false);`;


	const strCreateCategoryTable = `
CREATE TABLE Category(\
id INT NOT NULL AUTO_INCREMENT,\
name VARCHAR(100),\
PRIMARY KEY(id));`;

	const strInsertCategory = `
INSERT INTO CATEGORY(name) \
VALUES ("Security");`;

	const strCreateKeywordTable = `
CREATE TABLE Keyword(\
id INT NOT NULL AUTO_INCREMENT,\
name VARCHAR(100) NOT NULL,\
categoryID INT(100),\
PRIMARY KEY(id),\
FOREIGN KEY(categoryID)\
REFERENCES Category(id)\
ON DELETE CASCADE \
ON UPDATE CASCADE);`;

	const strInsertKeyword = `
INSERT INTO KEYWORD(name, categoryID) \
VALUES("SQL Injection", 1), ("XSS", 1);`;

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
INSERT INTO Career(career, usn) \
VALUES("NAVER - CTO", 1), ("KAKAO - CEO", 1);`;

	const strCreateRecommendKeywordTable = `
CREATE TABLE RecommendKeyword(\
usn	INT NOT NULL,\
keywordID INT NOT NULL, \
PRIMARY KEY(usn, keywordID),\
FOREIGN KEY(usn)\
REFERENCES User(usn)\
ON DELETE CASCADE \
ON UPDATE CASCADE,\
FOREIGN KEY(keywordID) \
REFERENCES Keyword(id) \
ON DELETE CASCADE \
ON UPDATE CASCADE);`;

	const strInsertRecommendKeyword = `
INSERT INTO RecommendKeyword(usn, keywordID) \
VALUES(1, 1);`

	const strCreateTotalKeywordTable = `
CREATE TABLE TotalKeyword(\
usn	INT NOT NULL,\
keywordID INT NOT NULL, \
PRIMARY KEY(usn, keywordID),\
FOREIGN KEY(usn)\
REFERENCES User(usn)\
ON DELETE CASCADE \
ON UPDATE CASCADE,\
FOREIGN KEY(keywordID) \
REFERENCES Keyword(id) \
ON DELETE CASCADE \
ON UPDATE CASCADE);`;

	const strInsertTotalKeyword = `
INSERT INTO TotalKeyword(usn, keywordID) \
VALUES(1, 1), (1, 2);`;

	const strCreateMatchingTable = `
CREATE TABLE Matching(\
id INT NOT NULL AUTO_INCREMENT,\
mentorUSN INT NOT NULL,\
menteeUSN INT NOT NULL,\
requestTime DATETIME NOT NULL,\
responseTime DATETIME NOT NULL,\
state INT NOT NULL,\
message VARCHAR(500),\
isCheck BOOL NOT NULL, \
PRIMARY KEY(id), \
FOREIGN KEY(mentorUSN)\
REFERENCES User(usn)\
ON DELETE CASCADE \
ON UPDATE CASCADE, \
FOREIGN KEY(menteeUSN) \
REFERENCES User(usn) \
ON DELETE CASCADE \
ON UPDATE CASCADE);`;
// state: 매칭 상태(0: 대기, 1: 수락, 2: 거절)

	const strInsertMatching = `
INSERT INTO Matching(mentorUSN, menteeUSN, requestTime, responseTime, state, isCheck) \
VALUES(1, 2, '2020-07-28 17:22:21', '2017-07-29 10:58:32', 1, true);`;

	const strCreateMatchingKeywordTable = `
CREATE TABLE MatchingKeyword(\
matchingID INT NOT NULL,\
keywordID INT NOT NULL,\
PRIMARY KEY(matchingID, keywordID), \
FOREIGN KEY(matchingID) REFERENCES Matching(id) \
ON DELETE CASCADE ON UPDATE CASCADE, \
FOREIGN KEY(keywordID) REFERENCES Keyword(id) \
ON DELETE CASCADE ON UPDATE CASCADE);`;

	const strInsertMatchingKeyword = `
INSERT INTO MatchingKeyword(matchingID, keywordID) \
VALUES(1, 1);`;

// 	const strCreateNotificationTable = `
// CREATE TABLE Notification\
// id INT NOT NULL AUTO_INCREMENT\
// type INT NOT NULL\
// isCheck BOOL NOT NULL\
// message VARCHAR(1000)\
// PRIMARY KEY(id);`;
// // type: 어떤 종류의 알림인지(0: 수락, 1: 거절, 2: 대기(요청), 3: 메시지?공지??)

// 	const strInsertNotificationTable = `
// INSERT INTO Notification(type, isCheck) \
// VALUES(0, true);`;

// 	const strCreateUserNotificationTable = `
// CREATE TABLE UserNotification\
// usn INT NOT NULL\
// notificationID INT NOT NULL\
// time DATETIME NOT NULL\
// reference INT NOT NULL;`;


	connection.query(
		strDropDB, (error: mysql.Error) => {
			console.log('DB is dropping...');
			if (error) {
				console.log('Unexpected Error\n' + error);
			} else {
				console.log('DB is dropped');
			};
		}
	);

  connection.query(
			strCreateUserTable
			+strCreateCategoryTable
			+strCreateKeywordTable
			+strCreateCareerTable
			+strCreateTotalKeywordTable
			+strCreateRecommendKeywordTable
			+strCreateMatchingTable
			+strCreateMatchingKeywordTable
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
		+strInsertCareer
		+strInsertTotalKeyword
		+strInsertRecommendKeyword
		+strInsertMatching
		+strInsertMatchingKeyword
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
