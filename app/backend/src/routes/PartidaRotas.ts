import { Router,
  Request,
  Response,
  NextFunction } from 'express';

import PartidaControl from '../controllers/PartidasController';
import nameValidationMiddleware from '../middlewares/timesVerificacao';
import ckeckTeam from '../middlewares/checandoTimes';
import tokenValidation from '../middlewares/tokenValidacao';

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
  (req:Request, res:Response, next: NextFunction) => tokenValidation(req, res, next),
  (req:Request, res:Response, next: NextFunction) => nameValidationMiddleware(req, res, next),
  (req:Request, res:Response, next: NextFunction) => ckeckTeam(req, res, next),
  (req:Request, res: Response) => matchesController.createMatch(req, res),
);
routers.patch(
  '/matches/:id/finish',
  (req:Request, res:Response, next: NextFunction) => tokenValidation(req, res, next),
  (req:Request, res: Response) => matchesController.atualizandoStatusDePar(req, res),
);
routers.patch(
  '/matches/:id',
  (req:Request, res:Response, next: NextFunction) => tokenValidation(req, res, next),
  (req:Request, res: Response) => matchesController.updateMatch(req, res),
);
export default routers;
