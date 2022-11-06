import { Model,
  INTEGER,
  STRING } from 'sequelize';

import db from '.';

class User extends Model {
  public id!: number;
  public password!: string;
  public email!: string;
  public role!: string;
  public username!: string;
}

/* class Usuario extends Model {
  public id!;
  public username!;
  public role!;
  public email!;
  public password!;
} */

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  username: {
    type: STRING,
    allowNull: false,
  },

  role: {
    type: STRING,
    allowNull: false,
  },

  email: {
    type: STRING,
    allowNull: false,
  },

  password: {
    type: STRING,
    allowNull: false,
  },

}, {
  underscored: true,
  timestamps: false,
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
});

export default User;
