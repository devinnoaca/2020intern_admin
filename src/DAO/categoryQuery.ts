// Category에 속한 Keyword를 가져옴
const searchCategory = `
SELECT Keyword.id, Keyword.name \
FROM Category as c \
JOIN Keyword as k on c.id = k.category_id \
WHERE c.id = ?;`;

const createCategory = `
INSERT INTO Category(name)\
VALUES (?);`;

const deleteCategory = `
DELETE FROM Category \
WHERE id = ?;`;

export default {
    searchCategory, createCategory, deleteCategory
};