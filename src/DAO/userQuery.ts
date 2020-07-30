const searchUser = `
SELECT usn, u.id, email, password, name, iamge, descroption, notificationCount, authorization, permission, type, c.id careerID, career\
FROM User as u join career as c \
WHERE User.usn = ?;`;

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
permission = ?,
type = ?, \
WHERE usn = ?;`;

const deleteUser = `
DELETE FROM User \
WHERE usn = ?;`;

export default {
    searchUser, searchAllUser, insertUser, updateUser, deleteUser
};