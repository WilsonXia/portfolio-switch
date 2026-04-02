const requiresLogin = (req, res, next) => {
  // Redirect to Login
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

const requiresLogout = (req, res, next) => {
  // Redirect to Maker
  if (req.session.account) {
    return res.redirect('/creator');
  }
  return next();
};

const requiresSecure = (req, res, next) => {
  // Redirect into a secure protocol
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

const bypassSecure = (req, res, next) => {
  next();
};

const redirectHome = (req, res, next) => res.redirect('/');

module.exports = {
  requiresLogin,
  requiresLogout,
  redirectHome,
  requiresSecure: process.env.NODE_ENV === 'production' ? requiresSecure
    : bypassSecure
}

// if (process.env.NODE_ENV === 'production') {
//   module.exports.requiresSecure = requiresSecure;
// } else {
//   module.exports.requiresSecure = bypassSecure;
// }
