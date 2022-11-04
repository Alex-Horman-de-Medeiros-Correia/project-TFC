import { SignOptions } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || 'jwt_secret';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

class TokenHandler {
  private jwtConfig?: SignOptions;
  constructor(jwtConfig?: SignOptions) {
    if (!jwtConfig) { this.jwtConfig = jwtDefaultConfig; }
  }

  public tokenGenerator = (payload: any) => jwt.sign({ data: payload }, SECRET, this.jwtConfig);

  public tokenValidate = async (token: any) => {
    try {
      const validate = await jwt.verify(token, SECRET);
      return validate;
    } catch (_err) {
      const e = new Error('Token must be a valid token');
      e.name = 'UnauthorizedError';
      console.log(e);
      return e;
    }
  };
}

export default TokenHandler;
