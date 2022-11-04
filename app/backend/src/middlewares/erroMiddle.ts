import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(401).json({ message: error.message });
  next();
};

export default errorMiddleware;
