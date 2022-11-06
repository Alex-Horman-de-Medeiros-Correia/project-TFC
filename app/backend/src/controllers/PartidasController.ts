import { Request,
  Response } from 'express';

import PartidasS from '../services/PartidasS';

class PartidaControl {
  private service: PartidasS;

  constructor() {
    this.service = new PartidasS();
  }

  public async todasPartidas(req: Request, res: Response) {
    const matches = await this.service.pegandoPartidas();

    return res.status(200).json(matches);
  }

  public async partidasEmProgresso(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'false') {
      const [team] = await this.service.partidasEmProgresso(false);

      return res.status(200).json(team);
    }
    const [team] = await this.service.partidasEmProgresso(true);

    return res.status(200).json(team);
  }

  /* public async todasasPartidas(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'false') {
      const [team] = await this.service.partidasEmProgresso(false);
      return res.status(200).json(team);
    }
    const [team] = await this.service.partidasEmProgresso(true);
    return res.status(200).json(team);
  } */

  public async atualizandoStatusDePar(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.service.atualizandoIdDePar(false, Number(id));
    return res.status(200).json(result);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;

    const { homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this.service.atualizarResultado(homeTeamGoals, awayTeamGoals, Number(id));

    return res.status(200).json(result);
  }

  public async createMatch(req: Request, res: Response) {
    const result = await this.service.createMatch(req.body);

    return res.status(201).json(result);
  }
}

export default PartidaControl;
