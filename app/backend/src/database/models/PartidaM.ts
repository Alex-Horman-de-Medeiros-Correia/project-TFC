import { INTEGER,
  BOOLEAN,
  Model } from 'sequelize';

import Team from './TimesM';
import db from '.';

class Match extends Model {
  public id!: number;
  public awayTeamGoals!: number;
  public homeTeam!: number;
  public awayTeam!: number;
  public homeTeamGoals!: number;
  public inProgress!: boolean;
}

// essa parte de baixo precisei de alguma orientação para fazer.

Match.init({

  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
  },

  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },

  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
  },

  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },

  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },

}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeam',
  as: 'teamHome' });

Team.hasMany(Match, { foreignKey: 'id', as: 'teamHome1' });

Match.belongsTo(Team, {
  foreignKey: 'awayTeam',
  as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'id', as: 'teamAway1' });

export default Match;
