import express from 'express';
import AnswerModel from '../../model/answer';
import {BAD_REQUEST, CREATED, OK} from "http-status-codes";

let answer = express.Router();

answer.post('/', (req, res) => {
  res.set('Content-Type', 'application/json');

  if (!req.accepts('json')) {
    res.statusCode = BAD_REQUEST;
    return res.json({err: 'The format received is not json'});
  }

  let answer = new AnswerModel(req.body);

  console.log(answer);

  answer.save().then(q => {

    res.statusCode = CREATED;
    res.json({
      message: 'Answer was created.',
      answer: {
        id: q.id, questionId: q.questionId, votes: q.votes
      }
    });

  }).catch(err => {
    res.statusCode = BAD_REQUEST;
    return res.json({err: err.message});
  });

});

answer.get('/:id', (req, res) => {
  res.set('Content-Type', 'application/json');
  AnswerModel.find({questionId: req.params.id}, 'id text votes').
  then(answs => {

    res.statusCode = OK;
    res.json(answs);

  }).catch(err => {
    res.statusCode = BAD_REQUEST;
    return res.json({err: err.message});
  });
});

export default answer;