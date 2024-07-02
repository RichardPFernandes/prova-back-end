const jwt = require("jsonwebtoken");

class AuthMiddleware {
  async handle(req, res, next) {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token é obrigatório" });
    }

    token = token.replace("Bearer ", "");

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
