const creatorPage = (req, res) => { return res.render('creator'); }

const homePage = (req, res) => res.render('home');

module.exports = {
    creatorPage,
    homePage,
};