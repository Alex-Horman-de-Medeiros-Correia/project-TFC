import Team from '../database/models/TimesM';
import Match from '../database/models/PartidaM';
import { Partidas } from '../interfaces/partidaInterface';

class PartidasS {
  public getMatches = async () => {
    const teams = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return teams;
  };

  public partidasEmProgresso = async (status: boolean) => {
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

  public atualizandoIdDePar = async (inProgress: boolean, id: number) => {
    await Match.update({ inProgress }, { where: { id } });
    return { message: 'Finished' };
  };

  public atualizarResultado = async (homeTeamGoals: number, awayTeamGoals: number, id: number) => {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { message: 'Updated!' };
  };

  public createMatch = async (
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: Partidas,
  ) => {
    const inProgress = true;
    const result = await Match.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );
    return result;
  };
}

export default PartidasS;
