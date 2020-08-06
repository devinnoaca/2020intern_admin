const getAllMatching = `
SELECT id, mentor_USN, mentee_USN, request_time, state, is_checked \
FROM Matching;`;

const getMatching = `
SELECT id, mentor_USN, mentee_USN, request_time, response_time, state, request_message, response_message, is_checked \
FROM Matching \
WHERE id = ?;`;

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

export default {
    getAllMatching, createMatching, deleteMatching, getMatching, modifyMatching
}