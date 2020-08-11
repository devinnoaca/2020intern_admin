const searchUserNotification = `
SELECT un.ID id, n.type type, receiver.ID receiver_ID, sender.ID sender_ID, un.is_checked is_checked, 
DATE_TIME(un.time time, '%Y-%m-%d %T') time \
FROM User_Notification as un \
JOIN Notification as n ON un.noti_id = n.id \
JOIN User as receiver ON un.receiver_usn = receiver.usn \
JOIN User as sender ON un.sender_usn = sender.usn \
WHERE n.type = ? \
AND (un.is_checked = ? \
OR un.is_checked = ?) \
AND receiver.ID = ? \
AND sender.ID = ?;`;

const searchUserByType = `
SELECT USN \
FROM User \
WHERE type = ?;`;

const searchUserByID = `
SELECT USN \
FROM User \
WHERE id = ?;`;

const searchAllUser = `
SELECT USN \
FROM User;`;

const createNotification = `
INSERT INTO Notification(type, message) \
VALUES(1, ?);`

const createUserNotification = `
INSERT INTO User_Notification(noti_ID, time, receiver_USN, sender_USN,is_checked) \
VALUES(?, NOW(), ?, ?, 0);`;

const deleteUserNotification = `
DELETE FROM User_Notification \
WHERE ID = ?;`;

const getNotifications = `
SELECT un.ID id, n.type type, receiver.ID receiver_ID, sender.ID sender_ID, un.is_checked is_checked, 
DATE_FORMAT(un.time, '%Y-%m-%d %T') time \
FROM User_Notification as un \
JOIN Notification as n ON un.noti_id = n.id \
JOIN User as receiver ON un.receiver_usn = receiver.usn \
JOIN User as sender ON un.sender_usn = sender.usn` 

export default {
  searchUserByType, searchUserByID, searchAllUser,
  createNotification, createUserNotification,
  searchUserNotification, deleteUserNotification, getNotifications
};