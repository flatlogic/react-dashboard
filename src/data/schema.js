import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
import posts from './queries/posts';
import addPost from './mutations/posts';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      news,
      posts,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      addPost
    }
  }),
});

export default schema;
