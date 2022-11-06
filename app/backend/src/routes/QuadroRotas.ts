import {
  Request,
  Response,
  Router } from 'express';

// rever conteudo quando puder

import QuadroController from '../controllers/QuadroController';

const routers: Router = Router();

const QuadroController1 = new QuadroController();

routers.get(
  '/leaderboard/home',
  (req:Request, res: Response) => QuadroController1.rankingTime(req, res),
);

routers.get(
  '/leaderboard/away',
  (req:Request, res: Response) => QuadroController1.pegandoRanking(req, res),
);

/* routers.get(
  '/leaderboard/away',
  (req:Request, res: Response) => QuadroController1.pegandoRanking(req, res),
); */

routers.get(
  '/leaderboard',
  (req:Request, res: Response) => QuadroController1.rankingTotal(req, res),
);
export default routers;
