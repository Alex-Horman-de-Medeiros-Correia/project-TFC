import { Response,
  NextFunction,
  Request } from 'express';

import TimesS from '../services/TimesS';
/* import TimesS from '../services/TimesS'; */

const checandoTime = async (req:Request, res:Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const timesS = new TimesS();

  const timeDaCasa = await timesS.timesId(homeTeam);

  const timeDeFora = await timesS.timesId(awayTeam);

  if (!timeDaCasa[0]?.id || !timeDeFora[0]?.id) {
    return res.status(404).json({

      message: 'There is no team with such id!',
    });
  }
  return next();
};

export default checandoTime;
