import * as mysql from 'mysql2';
import { dbConfig } from '../config/db.config';
const exec = require('child_process').exec

let connection = mysql.createPool(dbConfig.conf);
// 로컬 환경 DB 사용시 initialize
if (dbConfig.branch === 'LOCAL') {
(() => {
	exec('mysql -h 10.19.247.204 -ujingoo -p1234 innovation < ./testData.sql', (err) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log('local data inserted!!');
  });
})();
}

export default {
	connection
};
