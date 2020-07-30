const searchKeyword = `
SELECT id, name, categoryID \
FROM Keyword;`;

const createKeyword = `
INSERT INTO Keyword(name, categoryID) \
VALUES(?, ?);`;

const deleteKeyword = `
DELETE FROM Keyword \
WHERE id = ?`

export default {
    searchKeyword, createKeyword, deleteKeyword
};