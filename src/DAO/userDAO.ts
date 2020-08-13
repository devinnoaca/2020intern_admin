import query from './userQuery';
import db from '../db';

async function getUser(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.searchUser, data);
    console.log(rows);
    if (rows.length === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: getUser error\n' + e);
    throw e;
  }
}

async function getUserKeywords(data: Array<any>) {
  try {
    const [totalKeywords] = await db.connection.promise().query(query.searchUserTotalkeywords, data);
    const [recommendKeywords] = await db.connection.promise().query(query.searchUserRecommendkeywords, data);
    return {'totalKeywords': totalKeywords, 'recommendKeywords': recommendKeywords};
  } catch (e) {
    console.log('dao: getUserKeywords error\n' + e);
    throw e;
  }
}

async function createUser(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.insertUser, data);
    return rows;
  } catch (e) {
    console.log('dao: createUser error\n' + e);
    throw e;
  }
}

async function getUsers(extraQuery: String) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.searchAllUser + extraQuery);
    return rows;
  } catch (e) {
    console.log('dao: getUsers error\n' + e);
    throw e;
  }
}

async function deleteUser(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.deleteUser, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: deleteUser error\n' + e)
    throw e;
  }
}

async function modifyUser(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.updateUser, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: modifyUser error\n' + e);
    throw e;
  }
}

async function modifyUserWithoutPW(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.updateUserWithoutPW, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find'
    }
    return rows;
} catch (e) {
    console.log('dao: modifyUser error\n' + e);
    throw e;
}}

async function createUserCareer(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.updateUserCareerAdd, data);
    return rows;
  } catch (e) {
    console.log('dao: createUserCareer error\n' + e);
    throw e;
  }
}

async function modifyUserCareer(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.updateUserCareerModify, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: modifyUserCareer error\n' + e);
    throw e;
  }
}

async function deleteUserCareer(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.updateUserCareerDelete, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: modifyUserCareer error\n' + e);
    throw e;
  }
}

async function createUserRecommendKeyword(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.updateUserRecommendKeywordCreate, data);
    return rows;
  } catch (e) {
    console.log('dao: createUserRecommendKeyword error\n' + e);
    throw e;
  }
}

async function deleteUserRecommendKeyword(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.updateUserRecommendKeywordDelete, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: deleteUserRecommendKeyword error\n' + e);
    throw e;
  }
}

async function createUserTotalKeyword(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.updateUserTotalKeywordCreate, data);
    return rows;
  } catch (e) {
    console.log('dao: createUserTotalKeyword error\n' + e);
    throw e;
  }
}

async function deleteUserTotalKeyword(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.updateUserTotalKeywordDelete, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: deleteUserTotalKeyword error\n' + e);
    throw e;
  }
}

export default {
  getUser, createUser, getUsers, deleteUser, modifyUser,modifyUserWithoutPW,
  createUserCareer, modifyUserCareer, deleteUserCareer, 
  createUserRecommendKeyword, deleteUserRecommendKeyword,
  createUserTotalKeyword, deleteUserTotalKeyword,
  getUserKeywords
}