import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

import { responseHandler } from '../utils/helperFunctions';

export const getLogsHandler = (req: Request, res: Response) => {
  const logFilePath = path.join(__dirname, '../app.log');

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      return responseHandler(res, 500, { message: 'Failed to read application logs' });
    }
    res.type('text/plain');
    res.send(data);
  });
};
