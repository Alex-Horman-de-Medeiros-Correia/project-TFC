import Team from '../database/models/TimesM';

class TimesS {
  public getTeams = async () => {
    const teams = await Team.findAll({
      attributes: ['id', 'teamName'],
    });
    return teams;
  };

  public timesId = async (id:number) => {
    const team = await Team.findAll({
      attributes: ['id', 'teamName'],
      where: {
        id,
      },
    });
    return team;
  };
}
export default TimesS;
