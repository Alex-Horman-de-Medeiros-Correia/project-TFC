import { Request, Response } from 'express';
import TokenHandler from '../helpers/tokenV';
import LoginService from '../services/LoginS';

class Lcontroller {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public async getLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const userByEmail = await this.service.getUserByEmail(email);
    if (userByEmail) {
      const userByPassword = await this.service.getUserByPassword(email, password);
      if (userByPassword) {
        return res.status(200).json(userByPassword);
      }
    }
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  public loginValidation = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const tokenHandler = new TokenHandler();
    const validate = await tokenHandler.tokenValidate(token);
    res.locals.user = validate;
    const role = res.locals.user.data?.role;
    return res.status(200).json({ role });
  };
}

export default Lcontroller;
