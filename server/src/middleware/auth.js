export function requireAdmin(req, res, next) {
  if (req.session?.user?.role === 'admin') {
    return next();
  }
  return res.redirect('/admin/login');
}

export function authSession(req, res, next) {
  if (req.session?.user) {
    res.locals.currentUser = req.session.user;
  }
  next();
}
