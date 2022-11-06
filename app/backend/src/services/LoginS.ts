import TokenV from '../helpers/tokenV';
import User from '../database/models/UsuarioModel';
import VerificarSenha from '../helpers/criptoV';

class Lservice {
  public pegandoEmail = async (email:string) => {
    const user = await User.findOne({
      attributes: ['email', 'password'],
      where: {
        email,
      },
    });
    return user;
  };

  public pegandoSenha = async (email: string, password: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const teste = VerificarSenha.senhaComparada(
      password,
      user?.password,
    );
    if (teste) {
      const tokenV = new TokenV();
      const token = tokenV.tokenAqui(user);
      return { token };
    }
    return teste;
  };
}

export default Lservice;
