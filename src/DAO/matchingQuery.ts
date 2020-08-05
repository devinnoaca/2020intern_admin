const getAllMatching = `
SELECT id, mentorUSN, menteeUSN, requestTime, responseTime, state, message, isCheck \
FROM Matching;`;

// id | mentorUSN | menteeUSN | requestTime         | responseTime        | state | message | isCheck
const getMatching = `
SELECT id, mentorUSN, menteeUSN, requestTime, responseTime, state, message, isCheck \
FROM Matching \
WHERE id = ?;`;

const createMatching = `
INSERT INTO Matching(name, categoryID) \
VALUES(?, ?);`;

const deleteMatching = `
DELETE FROM Matching \
WHERE id = ?;`;

export default {
    getAllMatching, createMatching, deleteMatching, getMatching
};