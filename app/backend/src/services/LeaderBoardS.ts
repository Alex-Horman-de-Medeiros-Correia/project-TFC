import { Op } from 'sequelize';
import Team from '../database/models/TimesM';
import Match from '../database/models/PartidaM';
import TeamService from './TimesS';
import { ILeaderboard } from '../interfaces/leaderBoardInter';

class LeaderboardService {
  public totalVictories = 0;
  public totalLosses = 0;
  public totalDraws = 0;
  public goalsFavor = 0;
  public goalsOwn = 0;
  private serviceTeam: TeamService;

  constructor() {
    this.serviceTeam = new TeamService();
  }

  public getHomeTeamMatches = async (team: number) => {
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

  public getAwayTeamMatches = async (team: number) => {
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

  public getTeamMatches = async (team: number) => {
    const teams = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: {
        [Op.or]: [{ homeTeam: team }, { awayTeam: team }],
        inProgress: false,
      },
    });
    return teams;
  };

  public getResultsHomeTeam = (teams:Match[]) => {
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

  public getResultsAwayTeam = (teams: Match[]) => {
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

  public recordHomeTeam = (name: string) => {
    const totalPoints = this.totalVictories * 3 + this.totalDraws * 1;
    const totalGames = this.totalVictories + this.totalDraws + this.totalLosses;
    return {
      name,
      totalPoints,
      totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsFavor - this.goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  };

  public setAtributes = () => {
    this.totalVictories = 0;
    this.totalLosses = 0;
    this.totalDraws = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
  };

  public sortByAtributes = (param1: number, param2: number): any => {
    if (param1 < param2) {
      return 1;
    }
    if (param1 > param2) {
      return -1;
    }
  };

  public resultsSort = (array:any) => array.sort(
    (p1: any, p2: any) => {
      if (p1.totalPoints !== p2.totalPoints) {
        return this.sortByAtributes(p1.totalPoints, p2.totalPoints);
      }
      if (p1.totalVictories !== p2.totalVictories) {
        return this.sortByAtributes(p1.totalVictories, p2.totalVictories);
      }
      if (p1.goalsBalance !== p2.goalsBalance) {
        return this.sortByAtributes(p1.goalsBalance, p2.goalsBalance);
      }
      if (p1.goalsFavor !== p2.goalsFavor) {
        return this.sortByAtributes(p1.goalsFavor, p2.goalsFavor);
      }
      if (p1.goalsOwn !== p2.goalsOwn) {
        return this.sortByAtributes(p1.goalsOwn, p2.goalsOwn);
      }
      return 0;
    },
  );

  public getHomeTeamRanking = async () => {
    const ranking = [];
    const teams = await this.serviceTeam.getTeams();
    const teamNames = teams.map((team) => team?.teamName);
    const promises = teamNames.map(async (team, index) => {
      const matches = await this.getHomeTeamMatches(index + 1);
      return matches;
    });
    const MATCHES = await Promise.all(promises);
    for (let indexTeam = 0; indexTeam < teamNames.length; indexTeam += 1) {
      this.getResultsHomeTeam(MATCHES[indexTeam]);
      ranking[indexTeam] = this.recordHomeTeam(teamNames[indexTeam]);
      this.setAtributes();
    }
    // const sort = this.resultsSort(ranking);
    return ranking;
  };

  public getAwayTeamRanking = async () => {
    const ranking = [];
    const teams = await this.serviceTeam.getTeams();
    const teamNames = teams.map((team) => team?.teamName);
    const promises = teamNames.map(async (team, index) => {
      const matches = await this.getAwayTeamMatches(index + 1);
      return matches;
    });
    const MATCHES = await Promise.all(promises);
    for (let indexTeam = 0; indexTeam < teamNames.length; indexTeam += 1) {
      this.getResultsAwayTeam(MATCHES[indexTeam]);
      ranking[indexTeam] = this.recordHomeTeam(teamNames[indexTeam]);
      this.setAtributes();
    }
    // const sort = this.resultsSort(ranking);
    return ranking;
  };

  public teste = (
    ranking: ILeaderboard [],
    index: number,
  ) => {
    const totalPoints = ranking[index]?.totalPoints;
    const totalGames = ranking[index]?.totalGames;
    const totalVictories = ranking[index]?.totalVictories;
    const totalDraws = ranking[index]?.totalDraws;
    const totalLosses = ranking[index]?.totalLosses;
    const goalsFavor = ranking[index]?.goalsFavor;
    const goalsOwn = ranking[index]?.goalsOwn;
    return { totalPoints,
      totalVictories,
      totalGames,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn };
  };

  public rankingBoard = (home: ILeaderboard, away: ILeaderboard, name: string) => {
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

  public getGeralRanking = async () => {
    const ranking = [];
    const rankingHome = await this.getHomeTeamRanking();
    const rankingAway = await this.getAwayTeamRanking();
    for (let indexRanking = 0; indexRanking < rankingHome.length; indexRanking += 1) {
      const home = this.teste(rankingHome, indexRanking);
      const away = this.teste(rankingAway, indexRanking);
      const name = rankingHome[indexRanking]?.name;
      ranking[indexRanking] = this.rankingBoard(home, away, name);
    }
    return ranking;
  };
}

export default LeaderboardService;
