const searchKeyword = `
SELECT k.id keywordID , k.name keywordName, c.id categoryID, c.name categoryName \
FROM Keyword as k join Category as c \
WHERE c.id = k.categoryID;`;

const createKeyword = `
INSERT INTO Keyword(name, categoryID) \
VALUES(?, ?);`;

const deleteKeyword = `
DELETE FROM Keyword \
WHERE id = ?`

export default {
    searchKeyword, createKeyword, deleteKeyword
};