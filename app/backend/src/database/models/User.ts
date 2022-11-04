import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

export default class User extends Model {
  declare id: number;

  declare username: string;

  declare email: string;

  declare password: string;

  declare role: string;
}

/* export default class User extends Model {
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
  underscored: true,
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});
