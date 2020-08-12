import query from './keywordQuery';
import db from '../db';

async function getKeyword() {
  try {
    const [rows, fields] = await db.connection.promise().query(query.searchKeyword);
    return rows;
  } catch (e) {
    console.log('dao: getKeyword error\n' + e);
    throw e;
  }
}

async function createKeyword(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.createKeyword, data);
    return rows;
  } catch (e) {
    console.log('dao: createcKeyword error\n' + e);
    throw e;
  }
}

async function deleteKeyword(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.deleteKeyword, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find';
    }
    return rows;
  } catch (e) {
    console.log('dao: deleteKeyword error\n' + e);
    throw e;
  }
}

export default {
  getKeyword, createKeyword, deleteKeyword
}