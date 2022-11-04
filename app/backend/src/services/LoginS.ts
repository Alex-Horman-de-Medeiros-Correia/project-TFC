import TokenHandler from '../helpers/tokenV';
import User from '../database/models/UsuarioModel';
import PasswordVerifier from '../helpers/criptoV';

class LoginService {
  public getUserByEmail = async (email:string) => {
    const user = await User.findOne({
      attributes: ['email', 'password'],
      where: {
        email,
      },
    });
    return user;
  };

  public getUserByPassword = async (email: string, password: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const teste = PasswordVerifier.passwordCompare(
      password,
      user?.password,
    );
    if (teste) {
      const tokenHandler = new TokenHandler();
      const token = tokenHandler.tokenGenerator(user);
      return { token };
    }
    return teste;
  };
}

export default LoginService;
