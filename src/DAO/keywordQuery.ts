const searchKeyword = `
SELECT k.id keywordID , k.name keywordName, c.id categoryID, c.name categoryName \
FROM Keyword as k \
JOIN Category as c ON k.category_id = c.id;`;

const createKeyword = `
INSERT INTO Keyword(name, category_ID) \
VALUES(?, ?);`;

const deleteKeyword = `
DELETE FROM Keyword \
WHERE id = ?`

export default {
    searchKeyword, createKeyword, deleteKeyword
};