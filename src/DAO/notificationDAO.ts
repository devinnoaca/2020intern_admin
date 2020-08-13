import query from './notificationQuery';
import db from '../db';

async function createNotificationToAll(data: Array<any>) {
  try {
    const [users] = await db.connection.promise().query(query.searchAllUser);
    const [notification] = await db.connection.promise().query(query.createNotification, data)
    users.map( (r) => {
      db.connection.query(query.createUserNotification, [parseInt(notification.insertId), parseInt(r.USN), 1])
      // TODO(SeongJaeSong): Update noti_count of User table
    });
    return users;
  } catch (e) {
    console.log('dao: createNotificationToAll error\n' + e);
    throw e;
  }

}

async function createNotificationToMentor(data: Array<any>) {
  try {
    const [users] = await db.connection.promise().query(query.searchUserByType, [1]);
    const [notification] = await db.connection.promise().query(query.createNotification, data)
    users.map( (r) => {
      db.connection.query(query.createUserNotification, [parseInt(notification.insertId), parseInt(r.USN), 1])
      // TODO(SeongJaeSong): Update noti_count of User table
    });
    return users;
  } catch (e) {
    console.log('dao: createNotificationToMentor error\n' + e);
    throw e;
  }

}

async function createNotificationToMentee(data: Array<any>) {
  try {
    const [users] = await db.connection.promise().query(query.searchUserByType, [0]);
    const [notification] = await db.connection.promise().query(query.createNotification, data)
    users.map( (r) => {
      db.connection.query(query.createUserNotification, [parseInt(notification.insertId), parseInt(r.USN), 1])
      // TODO(SeongJaeSong): Update noti_count of User table
    });
    return users;
  } catch (e) {
    console.log('dao: createNotificationToMentee error\n' + e);
    throw e;
  }
}

async function createNotification(data: Array<any>) {
  try {
    const [user] = await db.connection.promise().query(query.searchUserByID, data[2]);
    const [notification] = await db.connection.promise().query(query.createNotification, data[1]);
    user.map( (c) => {
      db.connection.query(query.createUserNotification, [parseInt(notification.insertId), parseInt(c.USN), 1])
    })
    if (user.length === 0) {
      throw 'cannot find'
    }
    // TODO(SeongJaeSong): Update noti_count of User table
    return user;
  } catch (e) {
    console.log('dao: createNotification error\n' + e);
    throw e;
  }

}

async function getUserNotification(data: Array<any>) {
  try {
    const [rows] = await db.connection.promise().query(query.searchUserNotification, data);

    if (rows.length === 0) {
      throw 'cannot find';
    }
    return rows;
  } catch (e) {
    console.log('dao: getUserNotification error\n' + e);
    throw e;
  }

}

async function getNotifications(extraQuery: String){
  try {
    const [rows] = await db.connection.promise().query(query.getNotifications + extraQuery);
    
    if (rows.length === 0) {
      throw 'cannot find';
    }
    return rows;
  } catch (e) {
    console.log('dao: getNotifications error\n' + e);
  }
}

async function deleteUserNotification(data: Array<any>) {
  try {
    const [rows] = await db.connection.promise().query(query.deleteUserNotification, data);
    if (rows.affectedRows === 0) {
      throw 'cannot find'
    }
    return rows;
  } catch (e) {
    console.log('dao: createNotification error\n' + e);
    throw e;
  }

}

export default {
  createNotification, createNotificationToAll, createNotificationToMentor, createNotificationToMentee,
  getUserNotification, deleteUserNotification, getNotifications

}