import query from './keywordQuery';
import db from '../db';

async function getKeyword(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.searchKeyword, data);
    return rows;
  } catch (e) {
    console.log('dao: getKeyword error\n' + e);
  }
}

async function createKeyword(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.createKeyword, data);
    return rows;
  } catch (e) {
    console.log('dao: createcKeyword error\n' + e);
  }
}

async function deleteKeyword(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.deleteKeyword, data);
    return rows;
  } catch (e) {
    console.log('dao: deleteKeyword error\n' + e);
  }
}

export default {
  getKeyword, createKeyword, deleteKeyword
}