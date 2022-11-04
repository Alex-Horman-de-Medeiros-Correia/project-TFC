import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderBoardS';

class QuadroController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public async getHomeTeamRanking(req: Request, res: Response) {
    const ranking = await this.service.getHomeTeamRanking();
    const sort = this.service.resultsSort(ranking);
    return res.status(200).json(sort);
  }

  public async getAwayTeamRanking(req: Request, res: Response) {
    const ranking = await this.service.getAwayTeamRanking();
    const sort = this.service.resultsSort(ranking);
    return res.status(200).json(sort);
  }

  public async getGeralRanking(req: Request, res: Response) {
    const ranking = await this.service.getGeralRanking();
    const sort = this.service.resultsSort(ranking);
    return res.status(200).json(sort);
  }
}

export default QuadroController;
