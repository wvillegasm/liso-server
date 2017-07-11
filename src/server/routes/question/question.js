import express from 'express';
import QuestionModel from '../../model/question';
import {BAD_REQUEST, CREATED, OK} from "http-status-codes";

let question = express.Router();

question.post('/', (req, res) => {
  res.set('Content-Type', 'application/json');

  if (!req.accepts('json')) {
    res.statusCode = BAD_REQUEST;
    return res.json({err: 'The format received is not json'});
  }

  let question = new QuestionModel(req.body);

  question.save().then(q => {

    res.statusCode = CREATED;
    res.json({id: q.id, message: 'Question was created.'});

  }).catch(err => {
    res.statusCode = BAD_REQUEST;
    return res.json({err: err.message});
  });

});


question.get('/', (req, res) => {

  console.log(req.query);

  let {page = 0, limit = 0, offset = 0, sort = 'createdOn'} = req.query;

  if (page !== 0) page = Number.parseInt(page, 10);
  if (limit !== 0) limit = Number.parseInt(limit, 10);
  if (offset !== 0) offset = Number.parseInt(offset, 10);

  res.set('Content-Type', 'application/json');
  QuestionModel.paginate(
    {},
    {select: 'id votes content createdOn', page: page, limit: limit, offset: offset, sort: sort}
  )
    .then(qs => {

      console.log('docs: ', qs.docs.length);
      console.log('limit: ', qs.limit);
      console.log('total: ', qs.total);

      res.statusCode = OK;
      res.json(qs);


    })
    .catch(err => {
      res.statusCode = BAD_REQUEST;
      res.json({err: err.message});
    });

});

export default question;