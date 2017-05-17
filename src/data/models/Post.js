
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
    validate: { notEmpty: true },
  },

  content: {
    type: DataType.TEXT,
    defaultValue: false,
    validate: { notEmpty: true },
  },

}, {

  indexes: [
    { fields: ['title'] },
  ],

});

export default Post;
