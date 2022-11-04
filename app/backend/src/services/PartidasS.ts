import Team from '../database/models/TimesM';
import Match from '../database/models/PartidaM';
import { IMatch } from '../interfaces/partidaInterface';

class MatchService {
  public getMatches = async () => {
    const teams = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return teams;
  };

  public getMatchesInProgress = async (status: boolean) => {
    const teams = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: {
        inProgress: status,
      },
    });
    return [teams];
  };

  public updateMatchById = async (inProgress: boolean, id: number) => {
    await Match.update({ inProgress }, { where: { id } });
    return { message: 'Finished' };
  };

  public updateResultMatch = async (homeTeamGoals: number, awayTeamGoals: number, id: number) => {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { message: 'Updated!' };
  };

  public createMatch = async (
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: IMatch,
  ) => {
    const inProgress = true;
    const result = await Match.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );
    return result;
  };
}

export default MatchService;
