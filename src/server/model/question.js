import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import updateCreationDates from './updateCreationDates';

let question = new mongoose.Schema({
  title: {type: String, require: [true, 'Question Title is required']},
  votes: {type: Number, default: 0},
  content: {
    text: {type: String, require: [ true, 'Text content is required' ]},
    categories: {type: [ String ], require: [ false ]}
  }
});

question.plugin(updateCreationDates);
question.plugin(mongoosePaginate);

let QuestionModel = mongoose.model('Question', question);

export default QuestionModel;