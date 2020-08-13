import server from '../src/index';
const request = require('supertest')
const exec = require('child_process').exec;
(() => {
  exec('mysql -uroot -p1234 test < ./testData.sql', (err) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log('test data inserted!!');
  });
})();
describe('category test', () => {
  // beforeAll( () => {
  //   exec('mysql -uroot -p1234 test < ./testData.sql', (err) => {
  //     if (err) {
  //       console.error(`exec error: ${err}`);
  //       return;
  //     }
  //   });
  // })
  afterEach( () => {
    server.close();
  });
  test("create category with proper parameter", async () => {
    await request(server)
    .post('/category/')
    .send({name:'test'})
    .expect(200);
  });
  test("create category with improper parameter", async () => {
    await request(server)
    .post('/category/')
    .send({name: null})
    .expect(400);
  });
  test("create category without parameter", async () => {
    await request(server)
    .post('/category/')
    .expect(400);
  });
  test("delete category with proper parameter", async () => {
    await request(server)
    .delete('/category/2')
    .expect(200);
  });
  test("delete category with improper parameter", async () => {
    await request(server)
    .delete('/category/-1')
    .expect(500);
  });
});

describe('keyword test', () => {
  // beforeAll( () => {
  //   exec('mysql -uroot -p1234 test < ./testData.sql', (err) => {
  //     if (err) {
  //       console.error(`exec error: ${err}`);
  //       return;
  //     }
  //   });
  // })
  afterEach( () => {
    server.close();
  });
  test("get keywords", async () => {
    await request(server)
    .get('/keyword')
    .expect(200);
  });
  test("create keyword with proper parameter", async () => {
    await request(server)
    .post('/keyword')
    .send({name: 'testKeyword', categoryID: 1})
    .expect(200);
  });
  test("delete keyword with proper parameter", async () => {
    await request(server)
    .delete('/keyword/3')
    .expect(200)
  });
  test("delete keyword with improper parameter", async() => {
    await request(server)
    .delete('/keyword/-1')
    .expect(500)
  });
});

describe('matching test', () => {
  // beforeAll( () => {
  //   exec('mysql -uroot -p1234 test < ./testData.sql', (err) => {
  //     if (err) {
  //       console.error(`exec error: ${err}`);
  //       return;
  //     }
  //   });
  // })
  afterEach( () => {
    server.close();
  });
  test("get matchings", async () => {
    await request(server)
    .get('/matching')
    .expect(200);
  });
  test("get matching detail with proper parameter", async () => {
    await request(server)
    .get('/matching/1')
    .expect(200);
  })
  test("create matching with proper parameter", async () => {
    await request(server)
    .post('/matching')
    .send({mentor_ID: "ImMentor", mentee_ID: "ImMentee", state: 0})
    .expect(200);
  });
  test("create matching with improper parameter", async () => {
    await request(server)
    .post('/matching')
    .send({mentor_ID: "WrongID", mentee_ID: "Wrororrng", state: 0})
    .expect(500);
  });
  test("create matching without parameter", async () => {
    await request(server)
    .post('/matching')
    .send({mentee_ID: 3, state: 0})
    .expect(400);
  });
  test("modify form with proper parameter", async () => {
  await request(server)
  .get('/matching/update/2')
  .expect(200);
  });
  test("modify form with improper parameter", async () => {
  await request(server)
  .get('/matching/update/-1')
  .expect(500)
  });
  test("modify matching with proper parameter", async () => {
  await request(server)
  .put('/matching/update/2')
  .send({mentor_ID:"ImMentor", mentee_ID: "ImMentee", state: 1, is_checked:1, request_time: new Date(), response_time: new Date()})
  .expect(200);
  });
  test("modify matching with improper parameter", async () => {
  await request(server)
  .put('/matching/update/-1')
  .send({mentor_ID:"ImMentor", mentee_ID:"ImMentee", state: 1, is_checked:1, request_time: new Date(), response_time: new Date()})
  .expect(500);
  });
  test("delete matching with proper parameter", async () => {
    await request(server)
    .delete('/matching/2')
    .expect(200);
  });
  test("delete matching with improper parameter", async () => {
    await request(server)
    .delete('/matching/-1')
    .expect(500);
  });
  test("search matching with proper parameter", async () => {
    await request(server)
    .get('/matching/')
    .send({start_date: new Date(70,1,1), end_date: new Date(2100,1,1)})
    .expect(200)
  });
});

describe('notification test', () => {
  // beforeAll( () => {
  //   exec('mysql -uroot -p1234 test < ./testData.sql', (err) => {
  //     if (err) {
  //       console.error(`exec error: ${err}`);
  //       return;
  //     }
  //   });
  // })
  afterEach( () => {
    server.close();
  });
  test("create notification with proper parameter", async () => {
    await request(server)
    .post('/notification')
    .send({message: 'test', receiver: 'all'})
    .expect(302);
  });
  test("create notification with improper parameter", async () => {
    await request(server)
    .post('/notification')
    .send({message: 'test', receiver_ID: -1})
    .expect(500);
  });
  test("create notification without parameter", async () => {
    await request(server)
    .post('/notification')
    .expect(400);
  });
  test("search notification with proper parameter", async () => {
    await request(server)
    .post('/notification/search')
    .send({type: 1, is_checked: "all", receiver_ID: "ImMentor", sender_ID: "ImAdmin"})
    .expect(200);
  });
  test("search notification with improper parameter", async () => {
    await request(server)
    .post('/notification/search')
    .send({type: 1, is_checked: "all", receiver_ID: "ImMentortest", sender_ID: "ImAdmintest"})
    .expect(500);
  });
  test("search notification without parameter", async () => {
    await request(server)
    .post('/notification/search')
    .expect(400);
  });
  test("delete notification with proper parameter", async () => {
    await request(server)
    .delete('/notification/2')
    .expect(200);
  });
  test("delete user notification with improper parameter", async () => {
    await request(server)
    .delete('/notification/-1')
    .expect(500);
  });
});

describe('user test', () => {
  // beforeAll( () => {
  //   exec('mysql -uroot -p1234 test < ./testData.sql', (err) => {
  //     if (err) {
  //       console.error(`exec error: ${err}`);
  //       return;
  //     }
  //   });
  // })
  afterEach( () => {
    server.close();
  });
  test("create user with proper parameter", async () => {
    await request(server)
    .post('/user')
    .send({id:"testID", name:"testName", password:"testPW", email:"test@te.st", type:1, permission: -1})
    .expect(200);
  });
  test("create user with improper parameter", async () => {
    await request(server)
    .post('/user')
    .send({id:1235234, name:"testName", password:"testPW", email:"test@te.st", type:"asd", permission: -1})
    .expect(500);
  });
  test("create user without parameter", async () => {
    await request(server)
    .post('/user')
    .expect(400);
  });
  test("create user career with proper parameter", async () => {
    await request(server)
    .post('/user/career/4')
    .send({content: "INNO - Mentor"})
    .expect(200);
  });
  test("create user career with improper parameter", async () => {
    await request(server)
    .post('/user/career/-1')
    .send({content: "INNO - Mentor"})
    .expect(500);
  });
  test("create user career without parameter", async () => {
    await request(server)
    .post('/user/career/4')
    .expect(400);
  });
  test("create user recommend keyword with proper parameter", async () => {
    await request(server)
    .post('/user/keyword/recommend/4')
    .send({id:2})
    .expect(200);
  });
  test("create user recommend keyword with improper parameter", async () => {
    await request(server)
    .post('/user/keyword/recommend/4')
    .send({id:-1})
    .expect(500);
  });
  test("create user recommend keyword without parameter", async () => {
    await request(server)
    .post('/user/keyword/recommend/4')
    .expect(400);
  });
  test("create user total keyword with proper parameter", async () => {
    await request(server)
    .post('/user/keyword/total/4')
    .send({id:2})
    .expect(200);
  });
  test("create user total keyword with improper parameter", async () => {
    await request(server)
    .post('/user/keyword/total/4')
    .send({id:-1})
    .expect(500);
  });
  test("create user total keyword without parameter", async () => {
    await request(server)
    .post('/user/keyword/total/4')
    .expect(400);
  });
  test("get users", async () => {
    await request(server)
    .get('/user')
    .expect(200);
  });
  test("get user with proper parameter", async () => {
    await request(server)
    .get('/user/4')
    .expect(200);
  });
  test("get user with improper parameter", async () => {
    await request(server)
    .get('/user/-1')
    .expect(500);
  });
  test("modify user with proper parameter & without password", async () => {
    await request(server)
    .put('/user/4')
    .send({email:"test@te.st", name:"test", permission:1, type:1})
    .expect(200);
  });
  test("modify user with improper parameter & without password", async () => {
    await request(server)
    .put('/user/4')
    .send({email: 23525, name:1112, permission:"Asdf", type:"xbas"})
    .expect(500);
  });
  test("modify user with proper parameter & with password", async () => {
    await request(server)
    .put('/user/4')
    .send({password:'test', email:"test@te.st", name:"test", permission:1, type:1})
    .expect(200);
  });
  test("modify user with improper parameter & with password", async () => {
    await request(server)
    .put('/user/4')
    .send({password:'test', email: 23525, name:1112, permission:"Asdf", type:"xbas"})
    .expect(500);
  });
  test("modify user without parameter & without password", async () => {
    await request(server)
    .put('/user/4')
    .expect(400);
  });
  test("modify user career with proper parameter", async () => {
    await request(server)
    .put('/user/career/4')
    .send({id:3, content:"KAKAO - TALK"})
    .expect(200);
  });
  test("modify user career with improper parameter", async () => {
    await request(server)
    .put('/user/career/4')
    .send({id:-1, content:"KAKAO - TALK"})
    .expect(500);
  });
  test("modify user career without parameter", async () => {
    await request(server)
    .put('/user/career/4')
    .expect(400);
  });
  test("delete user total keyword with proper parameter", async () => {
    await request(server)
    .delete('/user/keyword/total/4')
    .send({id: 2})
    .expect(200);
  });
  test("delete user total keyword with improper parameter", async () => {
    await request(server)
    .delete('/user/keyword/total/4')
    .send({id: -1})
    .expect(500);
  });
  test("delete user total keyword without parameter", async () => {
    await request(server)
    .delete('/user/keyword/total/4')
    .expect(400);
  });
  test("delete user recommend keyword with proper parameter", async () => {
    await request(server)
    .delete('/user/keyword/recommend/4')
    .send({id: 2})
    .expect(200);
  });
  test("delete user recommend keyword with improper parameter", async () => {
    await request(server)
    .delete('/user/keyword/recommend/4')
    .send({id: -1})
    .expect(500);
  });
  test("delete user recommend keyword without parameter", async () => {
    await request(server)
    .delete('/user/keyword/recommend/4')
    .expect(400);
  });
  test("delete user career with proper parameter", async () => {
    await request(server)
    .delete('/user/career/4')
    .send({id: 3})
    .expect(200);
  });
  test("delete user career with improper parameter", async () => {
    await request(server)
    .delete('/user/career/4')
    .send({id:-1})
    .expect(500);
  });
  test("delete user career without parameter", async () => {
    await request(server)
    .delete('/user/career/4')
    .expect(400);
  });
  test("delete user with proper parameter", async () => {
    await request(server)
    .delete('/user/4')
    .expect(200);
  });
  test("delete user with improper parameter", async () => {
    await request(server)
    .delete('/user/-1')
    .expect(500);
  });
});