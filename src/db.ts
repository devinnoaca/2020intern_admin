import * as mysql from 'mysql2';
import { dbConfig } from '../config/db.config';

let connection = mysql.createPool(dbConfig.conf);
// 로컬 환경 DB 사용시 initialize
if (dbConfig.branch === 'LOCAL') {
(() => {
	connection = mysql.createConnection(dbConfig.conf);
	
	const strDropDB = `DROP DATABASE ${dbConfig.conf.database}; CREATE DATABASE ${dbConfig.conf.database}; USE ${dbConfig.conf.database};`

	const strCreateUserTable = `
CREATE TABLE User(\
USN INT NOT NULL AUTO_INCREMENT,\
name VARCHAR(45) NOT NULL,\
ID VARCHAR(45) NOT NULL,\
email VARCHAR(45) NOT NULL,\
password VARCHAR(45) NOT NULL,\
image_url TEXT ,\
description VARCHAR(1000),\
company TEXT,\
permission INT DEFAULT -1,\
noti_count INT DEFAULT 0,\
type INT NOT NULL,\
PRIMARY KEY(USN));`;

	const strInsertUser = `
INSERT INTO USER(\
USN, name, ID, email, password, image_url, description, \
company, permission, noti_count, type) \
VALUES (2, "Edsger Wybe Dijkstra","ImMentor", "mentor@e.mail", "q1w2e3r4", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/600px-Edsger_Wybe_Dijkstra.jpg", "Go To Statement Considered Harmful", "BaekSoo", 0, 1, 1), (3, "Cho Ding Kim", "ImMentee", "mentee@e.mail", "1234", "https://upload3.inven.co.kr/upload/2020/05/11/bbs/i13789520996.jpg", "I wanna be a adult!!!", "Elementary school", 0, 0, 0), (1, "SuperAdmin", "ImAdmin", "admin@e.mail", "d!e#tdDqa!12!@", "https://t1.daumcdn.net/cfile/blog/2778C3345902CAD121", "Hello, I'm Admin", "Innovation Academy", 2, 0, 2);`;


	const strCreateCategoryTable = `
CREATE TABLE Category(\
ID INT NOT NULL AUTO_INCREMENT,\
name VARCHAR(100) NOT NULL,\
PRIMARY KEY(ID));`;

	const strInsertCategory = `
INSERT INTO CATEGORY(name) \
VALUES ("Security"), ("DataScience"), ("Algorithm"), ("Graphics");`;

	const strCreateKeywordTable = `
CREATE TABLE Keyword(\
ID INT NOT NULL AUTO_INCREMENT,\
name VARCHAR(100) NOT NULL,\
category_ID INT,\
PRIMARY KEY(id),\
FOREIGN KEY(category_id)\
REFERENCES Category(ID)\
ON DELETE CASCADE \
ON UPDATE CASCADE);`;

	const strInsertKeyword = `
INSERT INTO KEYWORD(name, category_id) \
VALUES("SQL Injection", 1), ("XSS", 1), ("Spark", 2), ("Hadoop", 2), ("SQL", 2), ("Python", 3), ("Java", 3), ("C++", 3), ("OpenGL", 4), ("DX", 4), ("3DsMax", 4);`;

	const strCreateCareerTable = `
CREATE TABLE Career(\
ID INT NOT NULL AUTO_INCREMENT,\
user_USN INT NOT NULL,\
content VARCHAR(100) NOT NULL,\
PRIMARY KEY(ID), \
FOREIGN KEY(user_USN) \
REFERENCES User(USN) \
ON DELETE CASCADE \
ON UPDATE CASCADE);`;

	const strInsertCareer = `
INSERT INTO Career(content, user_usn) \
VALUES("NAVER - CTO", 1), ("KAKAO - CEO", 1);`;

	const strCreateRecommendKeywordTable = `
CREATE TABLE Recommend_keyword(\
user_USN	INT NOT NULL,\
keyword_ID INT NOT NULL, \
PRIMARY KEY(user_USN, keyword_ID),\
FOREIGN KEY(user_USN)\
REFERENCES User(usn)\
ON DELETE CASCADE \
ON UPDATE CASCADE,\
FOREIGN KEY(keyword_ID) \
REFERENCES Keyword(ID) \
ON DELETE CASCADE \
ON UPDATE CASCADE);`;

	const strInsertRecommendKeyword = `
INSERT INTO Recommend_keyword(user_usn, keyword_ID) \
VALUES(1, 1);`

	const strCreateTotalKeywordTable = `
CREATE TABLE User_total_keyword(\
user_usn	INT NOT NULL,\
keyword_ID INT NOT NULL, \
PRIMARY KEY(user_usn, keyword_ID),\
FOREIGN KEY(user_usn)\
REFERENCES User(usn)\
ON DELETE CASCADE \
ON UPDATE CASCADE,\
FOREIGN KEY(keyword_ID) \
REFERENCES Keyword(ID) \
ON DELETE CASCADE \
ON UPDATE CASCADE);`;

	const strInsertTotalKeyword = `
INSERT INTO User_total_keyword(user_usn, keyword_ID) \
VALUES(1, 1), (1, 2);`;

	const strCreateMatchingTable = `
CREATE TABLE Matching(\
ID INT NOT NULL AUTO_INCREMENT,\
mentee_USN INT NOT NULL,\
mentor_USN INT NOT NULL,\
request_time DATETIME DEFAULT NOW(),\
request_message TEXT,\
is_checked BOOL NOT NULL DEFAULT false,\
state INT NOT NULL DEFAULT 0,\
response_message TEXT, \
response_time DATETIME, \
PRIMARY KEY(ID),\
FOREIGN KEY(mentee_USN)\
REFERENCES User(usn)\
ON DELETE CASCADE \
ON UPDATE CASCADE,\
FOREIGN KEY(mentor_USN) \
REFERENCES User(usn) \
ON DELETE CASCADE \
ON UPDATE CASCADE);`;

	const strInsertMatching = `
INSERT INTO Matching(mentor_USN, mentee_USN, request_time, response_time, state, is_checked, request_message) \
VALUES(1, 2, '2020-07-28 17:22:21', '2017-07-29 10:58:32', 1, true, 'this is request message');`;


	const strCreateMatchingKeywordTable = `
CREATE TABLE Matching_keyword(\
ID INT NOT NULL AUTO_INCREMENT,\
matching_ID INT NOT NULL,\
keyword_name TEXT NOT NULL,\
category_name TEXT NOT NULL,\
PRIMARY KEY(ID),\
FOREIGN KEY(matching_ID)\
REFERENCES Matching(ID)\
ON DELETE CASCADE \
ON UPDATE CASCADE);`;

	const strInsertMatchingKeyword = `
INSERT INTO Matching_keyword(matching_ID, keyword_name, category_name) \
VALUES(1, "React", "Web");`;

	const strCreateNotificationTable = `
CREATE TABLE Notification( \
ID INT NOT NULL AUTO_INCREMENT, \
type INT NOT NULL, \
message TEXT, \
PRIMARY KEY(ID));`;

	const strInsertNotificationTable = `
INSERT INTO Notification(type) \
VALUES(0);`;

	const strCreateUserNotificationTable = `
CREATE TABLE User_notification(\
ID INT NOT NULL AUTO_INCREMENT, \
noti_ID INT NOT NULL, \
receiver_USN INT NOT NULL, \
sender_USN INT NOT NULL, \
is_checked BOOL NOT NULL DEFAULT 0, \
time DATETIME NOT NULL DEFAULT NOW(), \
PRIMARY KEY(ID), \
FOREIGN KEY(noti_ID) \
REFERENCES Notification(ID) \
ON DELETE CASCADE \
ON UPDATE CASCADE, \
FOREIGN KEY(receiver_USN) \
REFERENCES User(USN) \
ON DELETE CASCADE \
ON UPDATE CASCADE, \
FOREIGN KEY(sender_USN) \
REFERENCES User(USN) \
ON DELETE CASCADE \
ON UPDATE CASCADE);`;

	const strInsertUserNotification = `
INSERT INTO User_notification(noti_ID, receiver_USN, sender_USN) \
VALUES(1,2,1)`

	const strCreateRecommendKeywordView = `
CREATE OR REPLACE VIEW get_recommend_keyword AS \
SELECT t.user_usn mentee_USN, t.keyword_ID keyword_ID, k.name keyword_Name, k.category_ID category_ID, c.name category_Name \
FROM keyword as k \
JOIN category as c ON k.category_ID = c.ID \
JOIN recommend_keyword as t ON k.ID = t.keyword_id;`;

	const strCreateTotalKeywordView = `
CREATE OR REPLACE VIEW get_total_keyword AS \
SELECT r.user_usn user_usn, r.keyword_ID keyword_ID, k.name keyword_Name, k.category_ID category_ID, c.name category_Name \
FROM keyword as k \
JOIN category as c ON k.category_ID = c.ID \
JOIN User_total_keyword as r ON k.ID = r.keyword_ID;`;

	const strCreateAllKeywordView = `
CREATE OR REPLACE VIEW get_all_keyword AS \
SELECT k.name keyword_name, k.id keyword_id, c.id category_id, c.name category_name \
FROM Keyword as k \
JOIN Category as c ON k.category_id = c.ID;`;

	const strCreateMatchingMenteeView = `
CREATE OR REPLACE VIEW get_matching_mentee AS \
SELECT u.USN USN, u.name user_name, m.id matching_id, m.request_message request_message, m.response_message response_message, m.mentee_USN mentee_USN, m.state state, m.is_checked is_checked, m.request_time request_time, m.response_time response_time, mk.keyword_name keyword_name, mk.category_name category_name \
FROM User as u \
JOIN Matching as m ON u.usn = m.mentee_usn \
JOIN Matching_Keyword as mk ON m.id = mk.matching_id;`;

	const strCreateMatchingMentorView = `
CREATE OR REPLACE VIEW get_matching_mentor AS \
SELECT u.USN USN, u.name name, m.id matching_id, m.request_message request_message, m.response_message response_message, m.mentor_USN mentor_USN, m.state state, m.is_checked is_checked, m.request_time request_time, m.response_time response_time, mk.keyword_name keyword_name, mk.category_name category_name \
FROM User as u \
JOIN Matching as m ON u.usn = m.mentor_usn \
JOIN Matching_Keyword as mk ON m.id = mk.matching_id;`;

	const strCreateMentorListView = `
CREATE OR REPLACE VIEW get_mentor_list AS \
SELECT u.USN USN, u.name name, c.name category_name, k.name keyword_name, u.email email, u.image_url image_url, u.description description, cr.content career \
FROM Category as c \
JOIN Keyword as k ON c.id = k.category_id \
JOIN User_Total_Keyword as utk ON k.id = utk.keyword_id \
JOIN User as u ON utk.user_USN = u.usn \
JOIN Career as cr ON u.usn = cr.user_USN;`;

	connection.promise().query(
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
			+strCreateNotificationTable
			+strCreateUserNotificationTable
			+strCreateRecommendKeywordView
			+strCreateTotalKeywordView
			+strCreateAllKeywordView
			+strCreateMatchingMenteeView
			+strCreateMatchingMentorView
			+strCreateMentorListView
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
		+strInsertNotificationTable
		+strInsertUserNotification
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
