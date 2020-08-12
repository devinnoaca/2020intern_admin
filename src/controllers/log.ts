import * as express from 'express';

const fs = require('fs');
const jwt = require('jsonwebtoken');
const readline = require('readline');

const router = express.Router();

const getLogs = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("controller: get logs");

  try {
    const files = fs.readdirSync('../logs')
    let logFiles = [];
    files.map( (f) => {
      if(f.indexOf('WebLog') !== -1) logFiles.push(f);
    })
    logFiles.sort();
    let logs = []
    logFiles.map( (file) => {
      let lines = fs.readFileSync(`./logs/${file}`, 'UTF-8').split(/\r?\n/);
      lines.map( (line) => {
        logs.push(line);
      })
    })
    res.status(200).send(
      {
        logs
      }
    )
  } catch (e) {
    res.status(500).send()
  }
}

router.get('/', getLogs)

export = router;