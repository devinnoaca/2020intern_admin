const searchUser = `
SELECT u.usn, u.id, email, password, name, image, description, notificationCount, authorization, permission, type, c.id careerID, career \
FROM career as c \
JOIN user as u ON c.usn = u.usn \
WHERE u.usn = ?;`;

const searchUserTotalkeywords = `
SELECT keywordID, keywordName, categoryID, categoryName \
FROM UserTotalkeywordCategory \
WHERE usn = ?;`

const searchUserRecommendkeywords = `
SELECT keywordID, keywordName, categoryID, categoryName \
FROM UserRecommendkeywordCategory \
WHERE usn = ?;`;

const searchAllUser = `
SELECT * \
FROM User;`;

const insertUser = `
INSERT INTO User(id, email, password, name, image, description, notificationCount, authorization, permission, type) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

const updateUser = `
UPDATE User SET \
email = ?,\
password = ?,\
name = ?, \
image = ?, \
description = ?, \
notificationCount = ?, \
authorization = ?, \
permission = ?, \
type = ? \
WHERE usn = ?;`;

const updateUserCareerAdd = `
INSERT INTO Career(career, usn) \
VALUES(?, ?);`;

const updateUserCareerModify = `
UPDATE Career SET \
career = ? \
WHERE id = ?;`;

const updateUserCareerDelete = `
DELETE FROM Career \
WHERE id = ?;`;

const deleteUser = `
DELETE FROM User \
WHERE usn = ?;`;

const updateUserRecommendKeywordCreate = `
INSERT INTO RecommendKeyword(usn, keywordID) \
VALUES(?, ?);`;

const updateUserRecommendKeywordDelete = `
DELETE FROM RecommendKeyword(usn, keywordID) \
WHERE usn = ? and keywordID = ?;`;

const updateUserTotalKeywordCreate = `
INSERT INTO TotalKeyword(usn, keywordID) \
VALUES(?, ?);`;

const updateUserTotalKeywordDelete = `
DELETE FROM TotalKeyword(usn, keywordID) \
WHERE usn =? and keywordID = ?;`;

export default {
    searchUser, searchAllUser, insertUser, updateUser, deleteUser,updateUserCareerAdd, updateUserCareerModify, updateUserCareerDelete,
    updateUserRecommendKeywordCreate, updateUserRecommendKeywordDelete,
    updateUserTotalKeywordCreate, updateUserTotalKeywordDelete,
    searchUserTotalkeywords, searchUserRecommendkeywords
};