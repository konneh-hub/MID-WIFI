export function requireAdmin(req, res, next) {
  if (req.session?.user?.role === 'admin') {
    return next();
  }
  return res.redirect('/admin/login');
}

export function requireAuth(req, res, next) {
  if (req.session?.user) {
    req.user = req.session.user;
    return next();
  }
  return res.status(401).json({ message: 'Authentication required' });
}

export function authSession(req, res, next) {
  if (req.session?.user) {
    res.locals.currentUser = req.session.user;
  }
  next();
}
