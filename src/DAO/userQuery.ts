const searchUser = `
SELECT * \
FROM User \
WHERE usn = ?;`;

const searchAllUser = `
SELECT * \
FROM User;`;

const insertUser = `
INSERT INTO User(email, password, name, image, description, notificationCount, authorization, permission, type) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

const updateUser = `
UPDATE User SET \
email = ?,\
password = ?,\
name = ?, \
image = ?, \
description = ?, \
notificationCount = ?, \
authorization = ?, \
permission = ?,
type = ?, \
WHERE usn = ?;`;

const deleteUser = `
DELETE FROM User \
WHERE usn = ?;`;

export default {
    searchUser, searchAllUser, insertUser, updateUser, deleteUser
};