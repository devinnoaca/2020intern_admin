const logIn = `
SELECT usn FROM User 
WHERE ID = ? AND password = ? AND type = 2;`

export default {
  logIn
}