import { faker } from '@faker-js/faker';

import { posts } from '../data/store';
import { ALLOWED_PLATFORMS } from '../constants/allowedPlatforms';
import { MockPost } from '../types/posts';


const generatePost =(id: number): MockPost => {
  return {
    post_id: id,
    platform: faker.helpers.arrayElement(ALLOWED_PLATFORMS),
    timestamp: new Date().toISOString(),
    content: faker.lorem.sentence(),
    user_id: faker.string.uuid(),
  };
}

const startPostGeneration=()=> {
  let id = new Date().getTime();
  setInterval(() => {
    const post: MockPost = generatePost(id);
    id = new Date().getTime();
    posts.push(post)
  }, 5000);
}

export { startPostGeneration, MockPost };

