import { Request,
  Response } from 'express';

import Lservice from '../services/LoginS';
import TokenV from '../helpers/tokenV';

class Lcontroller {
  private service: Lservice;

  constructor() {
    this.service = new Lservice();
  }

  /* constructor() {
    this.service;
  } */

  public async pegandoLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const usandoEmail = await this.service.pegandoEmail(email);

    if (usandoEmail) {
      const usandoSenha = await this.service.pegandoSenha(email, password);
      if (usandoSenha) {
        return res.status(200).json(usandoSenha);
      }
    }
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  public validacaoDeLogin = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    /* const token = req.headers; */

    const tokenV = new TokenV();

    const validate = await tokenV.validacaoDeToken(token);
    res.locals.user = validate;

    const role = res.locals.user.data?.role;

    /* const role = res.locals.user; */

    return res.status(200).json({ role });
  };
}

export default Lcontroller;
