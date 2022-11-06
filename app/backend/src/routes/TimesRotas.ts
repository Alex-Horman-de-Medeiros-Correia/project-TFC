import {
  Router,
  Request,
  Response } from 'express';

import TimeC from '../controllers/TimesController';

const routers: Router = Router();

const timeC = new TimeC();

routers.get('/teams', (req:Request, res: Response) => timeC
  .todosTimes(req, res));

routers.get('/teams/:id', (req:Request, res: Response) => timeC
  .timeId(req, res));

export default routers;
