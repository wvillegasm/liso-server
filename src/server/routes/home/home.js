import express from 'express';

let home = express.Router();

home.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  //res.statusCode = 200;
  console.log('Before rendering');
  res.send(req.app.get('cache')['index']);
});

export default home;