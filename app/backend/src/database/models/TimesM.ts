import { INTEGER,
  STRING,
  Model } from 'sequelize';

import db from '.';

/* class Times extends Model {
  public id!;
  public nome!: string;
} */

class Team extends Model {
  public teamName!: string;
  public id!: number;
}

// essa parte de baixo precisei de orientação para fazer...

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  teamName: {
    type: STRING,
    allowNull: false,
    field: 'team_name',
  },

}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  tableName: 'teams',
});

export default Team;
