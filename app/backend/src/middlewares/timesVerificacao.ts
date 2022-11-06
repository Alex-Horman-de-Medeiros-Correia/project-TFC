import { Request,
  Response,
  NextFunction } from 'express';

const validacaoMiddle = (req:Request, res:Response, next: NextFunction): any => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(422).json({

      message: 'It is not possible to create a match with two equal teams',
    });
  }
  return next();
};

export default validacaoMiddle;
