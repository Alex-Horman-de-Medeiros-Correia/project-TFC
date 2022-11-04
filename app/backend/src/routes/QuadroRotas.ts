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
  (req:Request, res: Response) => QuadroController1.getHomeTeamRanking(req, res),
);

routers.get(
  '/leaderboard/away',
  (req:Request, res: Response) => QuadroController1.getAwayTeamRanking(req, res),
);

/* routers.get(
  '/leaderboard/away',
  (req:Request, res: Response) => QuadroController1.getAwayTeamRanking(req, res),
); */

routers.get(
  '/leaderboard',
  (req:Request, res: Response) => QuadroController1.getGeralRanking(req, res),
);
export default routers;
