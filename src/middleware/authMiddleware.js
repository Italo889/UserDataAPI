function authMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: 'Não autorizado' });
  }
}