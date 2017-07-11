import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import updateCreationDates from './updateCreationDates';

let answer = new mongoose.Schema({
  questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
  text: {type: String, require: [true, 'Answer text is required']},
  votes: {type: Number, default: 0}
});

answer.plugin(updateCreationDates);
answer.plugin(mongoosePaginate);

let AnswerModel = mongoose.model('Answer', answer);

export default AnswerModel;