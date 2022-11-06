import { Router, Request, Response, NextFunction } from 'express';
import Lcontroller from '../controllers/Lcontroller';
import FieldVerifier from '../middlewares/camposV';
import validToken from '../middlewares/tokenValidacao';

const routers: Router = Router();

const lcontroller = new Lcontroller();

routers.post(
  '/login',
  (req:Request, res:Response, next: NextFunction) => FieldVerifier.fieldVerify(req, res, next),
  (req:Request, res: Response) => lcontroller.pegandoLogin(req, res),
);
routers.get(
  '/login/validate',
  (req:Request, res:Response, next: NextFunction) => validToken(req, res, next),
  (req:Request, res: Response) => lcontroller.validacaoDeLogin(req, res),
);

export default routers;
