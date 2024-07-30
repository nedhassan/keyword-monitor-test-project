import { Request, Response } from 'express';

import { compareKeywordHandler, responseHandler } from '../utils/helperFunctions';
import { keywordsSet, posts } from '../data/store';
import { ALLOWED_PLATFORMS } from '../constants/allowedPlatforms';

let lastCheck = new Date().toISOString();


export const getFilteredPostsHandler = (req: Request, res: Response) => {
  const { platform, startDate, endDate } = req.query as {
    platform?: string;
    startDate?: string;
    endDate?: string;
  };

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (platform && !ALLOWED_PLATFORMS.includes(platform)) {
    return responseHandler(res, 400, { message: "Platform must be one of 'Reddit','Twitter'" });
  }

  if (start && isNaN(start.getTime())) {
    return responseHandler(res, 400, { message: "Invalid startDate format" });
  }

  if (end && isNaN(end.getTime())) {
    return responseHandler(res, 400, { message: "Invalid endDate format" });
  }

  if (start && end && end < start) {
    return responseHandler(res, 400, { message: "endDate cannot be earlier than startDate. Please adjust the dates and try again." });
  }

  const filteredPosts = posts.filter(post => {
    const postDate = new Date(post.timestamp);
    return (
      (!platform || post.platform === platform) &&
      (!start || postDate >= start) &&
      (!end || postDate <= end) &&
      compareKeywordHandler(post.content, keywordsSet)
    );
  });

  responseHandler(res, 200, filteredPosts);
};

export const getUpdatedPostsHandler = (req: Request, res: Response) => {
  const newPosts = posts.filter(post => new Date(post.timestamp) > new Date(lastCheck));
  lastCheck = new Date().toISOString();
  responseHandler(res, 200, newPosts);
};