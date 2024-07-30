import { Response } from 'express';

export const compareKeywordHandler = (content: string, keywordsSet: Record<string, boolean>): boolean => {
  const regexPattern = new RegExp(`\\b(?:${Object.keys(keywordsSet).join('|')})\\b`, 'i');
  return regexPattern.test(content);
};

export const responseHandler = (res: Response, statusCode: number, data: object) => {
  return res.status(statusCode).json(data);
};
