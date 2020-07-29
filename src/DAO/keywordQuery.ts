// Category list를 가져옴
const searchKeyword = `
SELECT id, name\
FROM Category;`;

const createKeyword = `
INSERT INTO Keyword(name, categoryID) \
VALUES(?, ?);`;

const deleteKeyword = `
DELETE FROM Keyword \
WHERE id = ?`

export default {
    searchKeyword, createKeyword, deleteKeyword
};