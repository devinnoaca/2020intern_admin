import query from './logInQuery';
import db from "../db";

async function logIn(data: Array<any>) {
  try {
    const[rows] = await db.connection.promise().query(query.logIn, data);
    if (rows.length === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: login error+\n' + e);
    throw e;
  }
}

export default {
  logIn
}