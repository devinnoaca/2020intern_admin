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
  }
}

async function createNotification(data: Array<any>) {
  try {
    const [user] = await db.connection.promise().query(query.searchUserByID, data);
    const [notification] = await db.connection.promise().query(query.createNotification, data)
    db.connection.query(query.createUserNotification, [parseInt(notification.insertId), parseInt(user.USN), 1])
    // TODO(SeongJaeSong): Update noti_count of User table
    return user;
  } catch (e) {
    console.log('dao: createNotification error\n' + e);
  }

}

async function getUserNotification(data: Array<any>) {
  try {
    const [rows] = await db.connection.promise().query(query.searchUserNotification, data);
    return rows;
  } catch (e) {
    console.log('dao: createNotification error\n' + e);
  }

}

async function getNotifications(){
  try {
    const [rows] = await db.connection.promise().query(query.getNotifications);
    return rows;
  } catch (e) {
    console.log('dao: getNotification error\n' + e);
  }
}

async function deleteUserNotification(data: Array<any>) {
  try {
    const [rows] = await db.connection.promise().query(query.deleteUserNotification, data);
    return rows;
  } catch (e) {
    console.log('dao: createNotification error\n' + e);
  }

}

export default {
  createNotification, createNotificationToAll, createNotificationToMentor, createNotificationToMentee,
  getUserNotification, deleteUserNotification, getNotifications

}