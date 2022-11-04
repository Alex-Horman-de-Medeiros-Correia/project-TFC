import { Request, Response, NextFunction } from 'express';
// import TokenHandler from '../helpers/tokenHandler';

const tokenValidation = async (req:Request, res:Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }
  // const tokenHandler = new TokenHandler();
  // const validate = await tokenHandler.tokenValidate(token);
  // res.locals.user = validate;
  // if (res.locals.user.data?.role === undefined || !res.locals.user.data?.role) {
  //   return res.status(401).json({
  //     message: 'Token must be a valid token',
  //   });
  // }

  return next();
};

export default tokenValidation;
