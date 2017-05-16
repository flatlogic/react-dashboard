import { GraphQLList as List } from 'graphql';
import { resolver } from 'graphql-sequelize';

import PostType from '../types/PostType';
import Post from '../models/Post';


const posts = {
  type: new List(PostType),
  resolve: resolver(Post)
};

export default posts;
