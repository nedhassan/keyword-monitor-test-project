import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { responseHandler } from '../utils/helperFunctions';
import { secrets } from '../utils/secrets';

export const userAuth = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username !== secrets.USERNAME || password !== secrets.PASSWORD) {
    return responseHandler(res, 401, { message: 'Invalid username or password' } );
  }

  const token = jwt.sign({ username }, secrets.JWT_SECRET, { expiresIn: '24h' });
  return res.json({ token });
};

