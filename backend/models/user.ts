'use strict';

import { Model, UUIDV4} from 'sequelize';

interface Users {
  id: string;
  username: string;
  email: string;
  password: string;
  likes: string[];
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<Users> 
  implements Users {
    id!: string;
    username!: string;
    email!: string;
    password!: string;
    likes!: string[];
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    }, 
    password: {
      type: DataTypes.STRING
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};