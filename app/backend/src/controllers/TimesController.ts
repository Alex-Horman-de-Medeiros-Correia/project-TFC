import { Request, Response } from 'express';
import TeamService from '../services/TimesS';

class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public async getAllTeams(req: Request, res: Response) {
    const teams = await this.service.getTeams();
    return res.status(200).json(teams);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const [team] = await this.service.getTeamsById(Number(id));
    return res.status(200).json(team);
  }
}

export default TeamController;
