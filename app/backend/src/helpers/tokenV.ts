import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

const SECRET = process.env.SECRET || 'jwt_secret';

const configJwtFunc: SignOptions = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

class TokenV {
  private atributeJwt?: SignOptions;

  constructor(atributeJwt?: SignOptions) {
    if (!atributeJwt) { this.atributeJwt = configJwtFunc; }
  }

  // estudar melhor o funcionamento do token -- precisei de ajuda aqui

  public tokenAqui = (payload: any) => jwt
    .sign({ data: payload }, SECRET, this.atributeJwt);

  public validacaoDeToken = async (token: any) => {
    try {
      const validate = await jwt.verify(token, SECRET);
      return validate;
    } catch (err) {
      const novoErro = new Error('Token must be a valid token');

      /* novoErro = 'UnauthorizedError'; */

      novoErro.name = 'UnauthorizedError';

      return novoErro;
    }
  };
}

export default TokenV;
