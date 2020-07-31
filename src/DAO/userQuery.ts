const searchUser = `
SELECT u.usn, u.id, email, password, name, image, description, notificationCount, authorization, permission, type, c.id careerID, career \
FROM career as c join user as u \
WHERE u.usn = ?;`;

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

export default {
    searchUser, searchAllUser, insertUser, updateUser, deleteUser,updateUserCareerAdd, updateUserCareerModify, updateUserCareerDelete
};