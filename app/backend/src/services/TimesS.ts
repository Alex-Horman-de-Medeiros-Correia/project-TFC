import Team from '../database/models/TimesM';

class TeamService {
  public getTeams = async () => {
    const teams = await Team.findAll({
      attributes: ['id', 'teamName'],
    });
    return teams;
  };

  public getTeamsById = async (id:number) => {
    const team = await Team.findAll({
      attributes: ['id', 'teamName'],
      where: {
        id,
      },
    });
    return team;
  };
}
export default TeamService;
