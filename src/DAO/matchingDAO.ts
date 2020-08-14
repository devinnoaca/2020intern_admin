import query from './MatchingQuery';
import db from '../db';

async function getAllMatching(extraQuery: String) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.getAllMatching+extraQuery);
    return rows;
  } catch (e) {
    console.log('dao: getAllMatching error\n' + e);
    throw e;
  }
}


async function getMatching(data: Array<any>) {
    try {
      const [rows, fields] = await db.connection.promise().query(query.getMatching, data);
      return rows;
    } catch (e) {
      console.log('dao: getMatching error\n' + e);
      throw e;
    }
  }

async function createMatching(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.createMatching, data );
    return rows;
  } catch (e) {
    console.log('dao: createMatching error\n' + e);
    throw e;
  }
}

async function deleteMatching(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.deleteMatching, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: deleteMatching error\n' + e);
    throw e;
  }
}

async function modifyMatching(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.modifyMatching, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: modifyMatching error\n' + e);
    throw e;
  }
}

async function searchMatching(data: Array<any>, extraQuery: String) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.searchMatching+extraQuery, data);
    return rows;
  } catch (e) {
    console.log('dao: searchMatching error\n' + e);
  }
}

async function searchUSN(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.searchUSNbyID, data);
    return rows;
  } catch (e) {
    console.log('dao: searchUSN error\n' + e);
  }
}

export default {
  getAllMatching, createMatching, deleteMatching, getMatching, modifyMatching,
  searchMatching, searchUSN
}
