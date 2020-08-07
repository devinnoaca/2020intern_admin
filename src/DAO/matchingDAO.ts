import query from './MatchingQuery';
import db from '../db';

async function getAllMatching() {
  try {
    const [rows, fields] = await db.connection.promise().query(query.getAllMatching);
    return rows;
  } catch (e) {
    console.log('dao: getAllMatching error\n' + e);
  }
}


async function getMatching(data: Array<any>) {
    try {
      const [rows, fields] = await db.connection.promise().query(query.getMatching, data);
      return rows;
    } catch (e) {
      console.log('dao: getMatching error\n' + e);
    }
  }

async function createMatching(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.createMatching, data);
    return rows;
  } catch (e) {
    console.log('dao: createMatching error\n' + e);
  }
}

async function deleteMatching(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.deleteMatching, data);
    return rows;
  } catch (e) {
    console.log('dao: deleteMatching error\n' + e);
  }
}

async function modifyMatching(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.modifyMatching, data);
    return rows;
  } catch (e) {
    console.log('dao: modifyMatching error\n' + e);
  }
}

async function searchMatching(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.searchMatching, data);
    return rows;
  } catch (e) {
    console.log('dao: searchMatching error\n' + e);
  }
}

export default {
  getAllMatching, createMatching, deleteMatching, getMatching, modifyMatching,
  searchMatching
}