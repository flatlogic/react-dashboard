import PostType from '../types/PostType';
import Post from '../models/Post';


import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';


const addPost = {
  type: PostType,
  description: 'Add a Post',
  args: {
    title: {
      name: 'Post title',
      type: new NonNull(StringType)
    },
    content: {
      name: 'Post content',
      type: new NonNull(StringType)
    }
  },
  resolve: (root, {title, content}) => {
    return Post.create({ title: title, content: content });
  }
};

export default addPost;
