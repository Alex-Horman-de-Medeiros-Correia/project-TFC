import { Request, Response, NextFunction } from 'express';

export default class FiedVerifier {
  public static fieldVerify = (req:Request, res:Response, next: NextFunction): any => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    return next();
  };
}