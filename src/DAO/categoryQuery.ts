// Category에 속한 Keyword를 가져옴
const searchCategory = `
SELECT Keyword.id, Keyword.name \
FROM Category join Keyword \
WHERE Category.id = ?;`;

const createCategory = `
INSERT INTO Category(name)\
VALUES (?);`;

const deleteCategory = `
DELETE FROM Category \
WHERE id = ?;`;

export default {
    searchCategory, createCategory, deleteCategory
};