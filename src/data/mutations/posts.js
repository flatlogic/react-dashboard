import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import PostType from '../types/PostType';
import Post from '../models/Post';

const addPost = {
  type: PostType,
  description: 'Add a Post',
  args: {
    title: {
      name: 'Post title',
      type: new NonNull(StringType),
    },
    content: {
      name: 'Post content',
      type: new NonNull(StringType),
    },
  },
  resolve: (root, { title, content }) => Post.create({ title, content }),
};

export default addPost;
