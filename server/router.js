const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getProjects', mid.requiresLogin, controllers.Project.getProjects);
  
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/creator', mid.requiresLogin, controllers.Project.creatorPage);
  app.post('/creator', mid.requiresLogin, controllers.Project.updateProject);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
