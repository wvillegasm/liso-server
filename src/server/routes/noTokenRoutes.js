//import auth from "./authenticate";
//import personAccess from './requestAccess';
//import home from './home/home';
import question from './question/question';
import answer from './answer/answer';

let noTokenRoutes = (app) => {
  //app.use('/', home);
  app.use('/question', question);
  app.use('/answer', answer);
  //app.use('/auth', auth);
  //app.use('/reqAccess', personAccess);

};

export default noTokenRoutes;