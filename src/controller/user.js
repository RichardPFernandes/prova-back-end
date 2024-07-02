const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

class UserController {
  async criarUsuario(nome, email, senha) {
    this.validarCampos(nome, email, senha);
    await this.verificarEmail(email);
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    const user = await User.create({ nome, email, senha: senhaCriptografada });

    return user;
  }

  async alterarUsuario(id, nome, senha) {
    const user = await this.buscarPorId(id);

    user.nome = nome;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
    user.senha = senhaCriptografada;
    user.save();

    return user;
  }

  async deletarUsuario(id) {
    const user = await this.buscarPorId(id);

    user.destroy();
  }

  async buscarPorId(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório");
    }

    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async listarUsuarios() {
    return User.findAll();
  }

  validarCampos(nome, email, senha) {
    if (nome === undefined || email === undefined || senha === undefined || nome === "" || email === "" || senha === "") {
      throw new Error("Nome, email e senha são obrigatórios");
    }
  }

  async verificarEmail(email) {
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new Error("Email já cadastrado");
    }
  }

  async login(email, senha) {
    if (!email || !senha) {
      throw new Error("Email e senha são obrigatórios");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      throw new Error("Senha inválida");
    }

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return { token: jwtToken };
  }
}

module.exports = new UserController();
