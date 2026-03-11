const creatorPage = (req, res) => { return res.render('creator'); }

const loginPage = (req, res) => res.render('login');

module.exports = {
    creatorPage,
    loginPage,
};