import { Router,
  Request,
  Response,
  NextFunction } from 'express';

import validToken from '../middlewares/tokenValidacao';
import PartidaControl from '../controllers/PartidasController';
import validacaoMiddle from '../middlewares/timesVerificacao';
import checandoTime from '../middlewares/checandoTimes';

const routers: Router = Router();

const partidasControler = new PartidaControl();

routers.get('/matches', (req:Request, res: Response) => {
  const { inProgress } = req.query;

  if (!inProgress) {
    return partidasControler.todasPartidas(req, res);
  }
  return partidasControler.partidasEmProgresso(req, res);
});

routers.post(
  '/matches',
  (req:Request, res:Response, next: NextFunction) => validToken(req, res, next),

  (req:Request, res:Response, next: NextFunction) => validacaoMiddle(req, res, next),

  (req:Request, res:Response, next: NextFunction) => checandoTime(req, res, next),

  (req:Request, res: Response) => partidasControler
    .createMatch(req, res),
);

routers.patch(
  '/matches/:id/finish',
  (req:Request, res:Response, next: NextFunction) => validToken(req, res, next),
  (req:Request, res: Response) => partidasControler
    .atualizandoStatusDePar(req, res),
);

routers.patch(
  '/matches/:id',
  (req:Request, res:Response, next: NextFunction) => validToken(req, res, next),

  (req:Request, res: Response) => partidasControler
    .updateMatch(req, res),
);

export default routers;
