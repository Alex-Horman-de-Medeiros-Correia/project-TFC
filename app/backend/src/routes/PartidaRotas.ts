import { Router,
  Request,
  Response,
  NextFunction } from 'express';

import PartidaControl from '../controllers/PartidasController';
import validacaoMiddle from '../middlewares/timesVerificacao';
import checandoTime from '../middlewares/checandoTimes';
import validToken from '../middlewares/tokenValidacao';

const routers: Router = Router();

const matchesController = new PartidaControl();

routers.get('/matches', (req:Request, res: Response) => {
  const { inProgress } = req.query;
  if (!inProgress) {
    return matchesController.todasPartidas(req, res);
  }
  return matchesController.partidasEmProgresso(req, res);
});
routers.post(
  '/matches',
  (req:Request, res:Response, next: NextFunction) => validToken(req, res, next),
  (req:Request, res:Response, next: NextFunction) => validacaoMiddle(req, res, next),
  (req:Request, res:Response, next: NextFunction) => checandoTime(req, res, next),
  (req:Request, res: Response) => matchesController.createMatch(req, res),
);
routers.patch(
  '/matches/:id/finish',
  (req:Request, res:Response, next: NextFunction) => validToken(req, res, next),
  (req:Request, res: Response) => matchesController.atualizandoStatusDePar(req, res),
);
routers.patch(
  '/matches/:id',
  (req:Request, res:Response, next: NextFunction) => validToken(req, res, next),
  (req:Request, res: Response) => matchesController.updateMatch(req, res),
);
export default routers;
