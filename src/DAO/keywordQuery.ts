const searchKeyword = `
SELECT *\
FROM Keyword;`;

const createKeyword = `
INSERT INTO Keyword(name, categoryID) \
VALUES(?, ?);`;

const deleteKeyword = `
DELETE FROM Keyword \
WHERE name = ?`

export default {
    searchKeyword, createKeyword, deleteKeyword
};