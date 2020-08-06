const searchUser = `
SELECT u.usn, u.id, email, password, name, image_url, description, company, noti_count, permission, type, c.id careerID, c.content career \
FROM career as c \
RIGHT JOIN user as u ON c.user_usn = u.usn \
WHERE u.usn = ?;`;

const searchUserTotalkeywords = `
SELECT keyword_ID, keyword_Name, category_ID, category_Name \
FROM get_total_keyword \
WHERE user_usn = ?;`

const searchUserRecommendkeywords = `
SELECT keyword_ID, keyword_Name, category_ID, category_Name \
FROM get_recommend_keyword \
WHERE mentee_usn = ?;`;

const searchAllUser = `
SELECT * \
FROM User;`;

const insertUser = `
INSERT INTO User(id, email, password, name, image_url, description, company, permission, noti_count,type) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

const updateUser = `
UPDATE User SET \
email = ?,\
password = ?,\
name = ?, \
image_url = ?, \
description = ?, \
noti_count = ?, \
permission = ?, \
type = ? \
WHERE usn = ?;`;

const updateUserWithoutPW = `
UPDATE User SET \
email = ?,\
name = ?, \
image_url = ?, \
description = ?, \
noti_count = ?, \
permission = ?, \
type = ? \
WHERE usn = ?;`;


const updateUserCareerAdd = `
INSERT INTO Career(user_usn, content) \
VALUES(?, ?);`;

const updateUserCareerModify = `
UPDATE Career SET \
content = ? \
WHERE id = ?;`;

const updateUserCareerDelete = `
DELETE FROM Career \
WHERE id = ?;`;

const deleteUser = `
DELETE FROM User \
WHERE usn = ?;`;

const updateUserRecommendKeywordCreate = `
INSERT INTO Recommend_Keyword(user_usn, keyword_ID) \
VALUES(?, ?);`;

const updateUserRecommendKeywordDelete = `
DELETE FROM Recommend_Keyword \
WHERE user_usn = ? and keyword_ID = ?;`;

const updateUserTotalKeywordCreate = `
INSERT INTO User_Total_Keyword(user_usn, keyword_ID) \
VALUES(?, ?);`;

const updateUserTotalKeywordDelete = `
DELETE FROM User_Total_Keyword \
WHERE user_usn = ? and keyword_ID = ?;`;

export default {
    searchUser, searchAllUser, insertUser, updateUser, updateUserWithoutPW, deleteUser,
    updateUserCareerAdd, updateUserCareerModify, updateUserCareerDelete,
    updateUserRecommendKeywordCreate, updateUserRecommendKeywordDelete,
    updateUserTotalKeywordCreate, updateUserTotalKeywordDelete,
    searchUserTotalkeywords, searchUserRecommendkeywords
};