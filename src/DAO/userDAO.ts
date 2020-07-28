import connection from '../db';

const searchUser = `
SELECT *\
FROM User
WHERE ID = ?;`;

const insertUser = `
INSERT INTO User(type, name, e-mail, password, auth)\
VALUES (?, ?, ?, ?, ?);`;

const updateUser = `
UPDATE User\
SET \
email = ?,\
password = ?,\
name = ?, \
image = ?, \
description = ?, \
company = ?
WHERE usn = ?;`;

const deleteUser = `
DELETE\
FROM User\
WHERE usn = ?;`;

export default {
    searchUser, insertUser, updateUser, deleteUser
};