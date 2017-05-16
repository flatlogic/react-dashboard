
import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

let PostType = new ObjectType({
  name: 'Task',
  description: 'A task',
  fields: {
    id: {
      type: new NonNull(ID),
      description: 'The id of the post.',
    },
    title: {
      type: StringType,
      description: 'The title of the post.',
    },
    content: {
      type: StringType,
      description: 'The content of the post.',
    }
  }
});

export default PostType;
