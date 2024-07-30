import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { secrets } from '../utils/secrets';
import { responseHandler } from '../utils/helperFunctions';
import { JwtPayload } from '../types/token';


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;


    if (!authHeader) {
      return responseHandler(res, 401, { message: 'Missing token. Please supply a token in the Authorization header.' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (!/^Bearer$/i.test(scheme)) {
      return responseHandler(res, 401, { message: 'Invalid token' });
    }

    const decoded = jwt.verify(token, secrets.JWT_SECRET) as JwtPayload;
    req.user = decoded;

    return next();
  } catch (error) {
    return responseHandler(res, 401, { message: 'Invalid token' });
  }
};

export default jwtAuthMiddleware;

