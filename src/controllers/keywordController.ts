import { Request, Response } from 'express';

import { responseHandler } from '../utils/helperFunctions';
import { keywordsSet } from '../data/store';

export const addKeywordHandler = (req: Request, res: Response) => {
  const { keyword } = req.body;

  if (typeof keyword !== 'string' || !keyword.trim()) {
    return responseHandler(res, 400, { message: "Keyword must be a non-empty string" });
  }

  if (keyword in keywordsSet) {
    return responseHandler(res, 400, { message: "Keyword already exists" });
  }

  keywordsSet[keyword] = true;
  return responseHandler(res, 201, { message: `Keyword "${keyword}" added` });
};

export const getSortedKeywordsHandler = (req: Request, res: Response) => {
  // Return array of keywords sorted alphabetically
  return res.json(Object.keys(keywordsSet).sort());
};
