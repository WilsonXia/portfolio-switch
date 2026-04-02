const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getProjects', controllers.Project.getProjects);
  app.get('/getProject', mid.requiresLogin, controllers.Project.getProject);
  app.post('/create', mid.requiresLogin, controllers.Project.createProject);
  app.post('/update', mid.requiresLogin, controllers.Project.updateProject);

  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);  

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Page.homePage);
  app.get('/home', mid.requiresSecure, mid.requiresLogout, controllers.Page.homePage);
  app.get('/creator', mid.requiresLogin, controllers.Page.creatorPage);
  app.get('/projects', mid.requiresSecure, controllers.Page.projectsPage);
};

module.exports = router;