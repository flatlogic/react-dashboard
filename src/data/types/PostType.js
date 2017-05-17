
import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

let PostType = new ObjectType({
  name: 'Post',
  description: 'A post',
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
    },
    updatedAt: {
      type: StringType,
      description: 'The date post was updated',
    }
  }
});

export default PostType;
