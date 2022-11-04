import { Router, Request, Response } from 'express';
import TeamController from '../controllers/TimesController';

const routers: Router = Router();

const teamController = new TeamController();

routers.get('/teams', (req:Request, res: Response) => teamController.getAllTeams(req, res));
routers.get('/teams/:id', (req:Request, res: Response) => teamController.getTeamById(req, res));

export default routers;
