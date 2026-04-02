const creatorPage = (req, res) => { return res.render('creator'); }
const projectsPage = (req, res) => res.render('projects');
const homePage = (req, res) => res.render('home');

module.exports = {
    creatorPage,
    homePage,
    projectsPage,
};