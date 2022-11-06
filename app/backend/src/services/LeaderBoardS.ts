import { Op } from 'sequelize';
import { Board } from '../interfaces/leaderBoardInter';
import Team from '../database/models/TimesM';
import Match from '../database/models/PartidaM';
import TimesS from './TimesS';

class BoardServ {
  private serviceTeam: TimesS;
  public totalVictories = 0;
  public goalsOwn = 0;
  public totalDraws = 0;
  public goalsFavor = 0;
  public totalLosses = 0;

  constructor() {
    this.serviceTeam = new TimesS();
  }

  // aqui obtive ajuda para fazer a implementação de alguns métodos...

  public partidasDaCasa = async (team: number) => {
    const teams = await Match.findAll({

      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },

        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: {
        homeTeam: team,

        inProgress: false,
      },
    });

    return teams;
  };

  public partidasDosTimes = async (team: number) => {
    const teams = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },

        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: {
        awayTeam: team,
        inProgress: false,
      },
    });

    return teams;
  };

  public pegandoPartidasTimes = async (team: number) => {
    const teams = await Match.findAll({

      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },

        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: {
        /* [Op.or]: [{ homeTeam }, { awayTeam }],
        inProgress: false, */
        [Op.or]: [{ homeTeam: team }, { awayTeam: team }],
        inProgress: false,
      },
    });
    return teams;
  };

  public resultadoTimeDaCasa = (teams:Match[]) => {
    for (let i = 0; i < teams.length; i += 1) {
      const homeTeamGoals = teams[i]?.homeTeamGoals;
      const awayTeamGoals = teams[i]?.awayTeamGoals;
      if (homeTeamGoals > awayTeamGoals) {
        this.totalVictories += 1;
      }
      if (homeTeamGoals < awayTeamGoals) {
        this.totalLosses += 1;
      }
      if (homeTeamGoals === awayTeamGoals) {
        this.totalDraws += 1;
      }
      this.goalsFavor += homeTeamGoals;
      this.goalsOwn += awayTeamGoals;
    }
  };

  public resultadoTimesDeFora = (teams: Match[]) => {
    for (let i = 0; i < teams.length; i += 1) {
      const homeTeamGoals = teams[i]?.homeTeamGoals;
      const awayTeamGoals = teams[i]?.awayTeamGoals;
      if (homeTeamGoals < awayTeamGoals) {
        this.totalVictories += 1;
      }
      if (homeTeamGoals > awayTeamGoals) {
        this.totalLosses += 1;
      }
      if (homeTeamGoals === awayTeamGoals) {
        this.totalDraws += 1;
      }
      this.goalsFavor += awayTeamGoals;
      this.goalsOwn += homeTeamGoals;
    }
  };

  public registroTimeCasa = (name: string) => {
    const totalPoints = this.totalVictories * 3 + this.totalDraws * 1;
    const totalGames = this.totalVictories + this.totalDraws + this.totalLosses;
    return {
      totalGames,
      totalPoints,
      name,
      totalLosses: this.totalLosses,
      goalsBalance: this.goalsFavor - this.goalsOwn,
      goalsFavor: this.goalsFavor,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      goalsOwn: this.goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  };

  public atributosFeitos = () => {
    this.goalsOwn = 0;
    this.totalLosses = 0;
    this.totalVictories = 0;
    this.goalsFavor = 0;
    this.totalDraws = 0;
  };

  public pegandoAtributos = (num: number, num2: number): any => {
    if (num < num2) {
      return 1;
    }
    if (num > num2) {
      return -1;
    }
  };

  public resultado = (array: any) => array.sort(
    (result1: any, result2: any) => {
      if (result1.totalPoints !== result2.totalPoints) {
        return this.pegandoAtributos(result1.totalPoints, result2.totalPoints);
      }
      if (result1.totalVictories !== result2.totalVictories) {
        return this.pegandoAtributos(result1.totalVictories, result2.totalVictories);
      }
      if (result1.goalsBalance !== result2.goalsBalance) {
        return this.pegandoAtributos(result1.goalsBalance, result2.goalsBalance);
      }
      if (result1.goalsFavor !== result2.goalsFavor) {
        return this.pegandoAtributos(result1.goalsFavor, result2.goalsFavor);
      }
      if (result1.goalsOwn !== result2.goalsOwn) {
        return this.pegandoAtributos(result1.goalsOwn, result2.goalsOwn);
      }
      return 0;
    },
  );

  public rankingTime = async () => {
    const ranking = [];
    const teams = await this.serviceTeam.captoTimes();
    const teamNames = teams.map((team) => team?.teamName);
    const promises = teamNames.map(async (team, index) => {
      const matches = await this.partidasDaCasa(index + 1);
      return matches;
    });
    const MATCHES = await Promise.all(promises);
    for (let indexTeam = 0; indexTeam < teamNames.length; indexTeam += 1) {
      this.resultadoTimeDaCasa(MATCHES[indexTeam]);
      ranking[indexTeam] = this.registroTimeCasa(teamNames[indexTeam]);
      this.atributosFeitos();
    }
    return ranking;
  };

  public pegandoRanking = async () => {
    const ranking = [];
    const teams = await this.serviceTeam.captoTimes();
    const teamNames = teams.map((team) => team?.teamName);
    const promises = teamNames.map(async (team, index) => {
      const matches = await this.partidasDosTimes(index + 1);
      return matches;
    });
    const MATCHES = await Promise.all(promises);
    for (let indexTeam = 0; indexTeam < teamNames.length; indexTeam += 1) {
      this.resultadoTimesDeFora(MATCHES[indexTeam]);
      ranking[indexTeam] = this.registroTimeCasa(teamNames[indexTeam]);
      this.atributosFeitos();
    }
    return ranking;
  };

  public teste = (ranking: Board [], index: number) => {
    const goalsOwn = ranking[index]?.goalsOwn;
    const totalPoints = ranking[index]?.totalPoints;
    const totalLosses = ranking[index]?.totalLosses;
    const totalGames = ranking[index]?.totalGames;
    const totalVictories = ranking[index]?.totalVictories;
    const goalsFavor = ranking[index]?.goalsFavor;
    const totalDraws = ranking[index]?.totalDraws;
    return { totalPoints,
      totalVictories,
      totalGames,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn };
  };

  public rankingBoard = (home: Board, away: Board, name: string) => {
    const rankingBoard = {
      name,
      totalPoints: home.totalPoints + away.totalPoints,
      totalGames: home.totalGames + away.totalGames,
      totalVictories: home.totalVictories + away.totalVictories,
      totalDraws: home.totalDraws + away.totalDraws,
      totalLosses: home.totalLosses + away.totalLosses,
      goalsFavor: home.goalsFavor + away.goalsFavor,
      goalsOwn: home.goalsOwn + away.goalsOwn,
      goalsBalance: (home.goalsFavor + away.goalsFavor) - (home.goalsOwn + away.goalsOwn),
      efficiency: (((home.totalPoints + away.totalPoints)
       / ((home.totalGames + away.totalGames) * 3)) * 100).toFixed(2),
    };
    return rankingBoard;
  };

  public rankingTotal = async () => {
    const ranking = [];
    const rankingHome = await this.rankingTime();
    const rankingAway = await this.pegandoRanking();
    for (let indexRanking = 0; indexRanking < rankingHome.length; indexRanking += 1) {
      const home = this.teste(rankingHome, indexRanking);
      const away = this.teste(rankingAway, indexRanking);
      const name = rankingHome[indexRanking]?.name;
      ranking[indexRanking] = this.rankingBoard(home, away, name);
    }
    return ranking;
  };
}

export default BoardServ;
