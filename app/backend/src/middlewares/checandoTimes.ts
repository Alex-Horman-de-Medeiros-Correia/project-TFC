import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TimesS';

const ckeckTeam = async (req:Request, res:Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const teamService = new TeamService();

  const checkHomeTeam = await teamService.getTeamsById(homeTeam);
  const checkAwayTeam = await teamService.getTeamsById(awayTeam);

  if (!checkHomeTeam[0]?.id || !checkAwayTeam[0]?.id) {
    return res.status(404).json({
      message: 'There is no team with such id!',
    });
  }
  return next();
};

export default ckeckTeam;
