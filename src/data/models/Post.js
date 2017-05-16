
import DataType from 'sequelize';
import Model from '../sequelize';

const Post = Model.define('Post', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  title: {
    type: DataType.STRING(255),
    defaultValue: false,
  },

  content: {
    type: DataType.TEXT,
    defaultValue: false,
  },

}, {

  indexes: [
    { fields: ['title'] },
  ],

});

export default Post;
