import { Request, Response, NextFunction } from 'express';
import TimesS from '../services/TimesS';
/* import TimesS from '../services/TimesS'; */

const ckeckTeam = async (req:Request, res:Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const timesS = new TimesS();

  const checkHomeTeam = await timesS.timesId(homeTeam);
  const checkAwayTeam = await timesS.timesId(awayTeam);

  if (!checkHomeTeam[0]?.id || !checkAwayTeam[0]?.id) {
    return res.status(404).json({
      message: 'There is no team with such id!',
    });
  }
  return next();
};

export default ckeckTeam;
