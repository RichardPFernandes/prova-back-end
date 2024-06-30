class AuthMiddleware {
  async handle(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token é obrigatório" });
    }

    try {
      const chave = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = chave.id;

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido" });
    }
  }
}

module.exports = new AuthMiddleware();
