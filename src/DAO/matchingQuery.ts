const getAllMatching = `
SELECT m.id, m.mentor_USN, mentor.ID mentor_ID, m.mentee_USN, mentee.ID mentee_ID, date_format(m.request_time,'%Y-%m-%d %T') AS request_time, m.state, m.is_checked \
FROM Matching as m \
JOIN User as mentor ON mentor.USN = m.mentor_USN \
JOIN User as mentee ON mentee.USN = m.mentee_USN`;

const getAllMatchingPagination = `
SELECT ceil(count(*)) totalCount,ceil(count(*)/30) totalPage \
FROM Matching as m \
JOIN User as mentor ON mentor.USN = m.mentor_USN \
JOIN User as mentee ON mentee.USN = m.mentee_USN`;

const getMatching = `
SELECT m.id id, mentor.ID mentor_ID, mentee.ID mentee_ID, date_format(m.request_time,'%Y-%m-%d %T') AS request_time, date_format(m.response_time,'%Y-%m-%d %T') AS response_time, m.state state, m.request_message request_message, m.response_message response_message, m.is_checked is_checked \
FROM Matching as m \
JOIN User as mentee ON m.mentee_USN = mentee.USN \
JOIN User as mentor ON m.mentor_USN = mentor.USN \
WHERE m.id = ?;`;

const createMatching = `
INSERT INTO Matching(mentor_USN, mentee_USN, request_time, state, is_checked, request_message, response_message) \
VALUES(?, ?, ?, ?, ?, ?, ?);`;

const deleteMatching = `
DELETE FROM Matching \
WHERE id = ?;`;

const modifyMatching = `
UPDATE Matching SET \
mentor_USN = ?,\
mentee_USN = ?,\
request_time = ?,\
response_time = ?,\
state = ?,\
request_message = ?,\
response_message = ?,\
is_checked = ? \
WHERE id = ?;`;

const searchMatchingPagination = `
SELECT ceil(count(*)) totalCount,ceil(count(*)/30) totalPage \
FROM Matching as m \
JOIN User as mentor ON mentor.USN = m.mentor_USN \
JOIN User as mentee ON mentee.USN = m.mentee_USN \
WHERE m.request_time >= ? \
AND m.request_time <= ?`

const searchMatching = `
SELECT m.id id, m.mentor_USN mentor_USN, mentor.ID mentor_ID, m.mentee_USN mentee_USN, mentee.ID mentee_ID, date_format(m.request_time,'%Y-%m-%d %T') AS request_time, m.state, m.is_checked \
FROM Matching as m \
JOIN User as mentor ON mentor.USN = m.mentor_USN \
JOIN User as mentee ON mentee.USN = m.mentee_USN \
WHERE m.request_time >= ? \
AND m.request_time <= ?`;

const searchUSNbyID = `
SELECT usn FROM User \
WHERE ID = ?;`;

export default {
    getAllMatching, createMatching, deleteMatching, getMatching, modifyMatching,
    searchMatching, searchUSNbyID, getAllMatchingPagination, searchMatchingPagination
}