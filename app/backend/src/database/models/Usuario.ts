import { STRING,
  INTEGER,
  Model } from 'sequelize';

import db from '.';

export default class User extends Model {
  declare id: number;
  declare role: string;
  declare username: string;
  declare password: string;
  declare email: string;
}

/* export default class Usuario extends Model {
    declare id: number;

    declare username: ;

    declare email:;

    declare password:;

    declare role:;
  } */

User.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },

  username: {
    allowNull: false,
    type: STRING,
  },

  email: {
    allowNull: false,
    type: STRING,
  },

  password: {
    allowNull: false,
    type: STRING,
  },

  role: {
    allowNull: false,
    type: STRING,
  },

}, {
  timestamps: false,
  underscored: true,
  tableName: 'users',
  sequelize: db,
});
