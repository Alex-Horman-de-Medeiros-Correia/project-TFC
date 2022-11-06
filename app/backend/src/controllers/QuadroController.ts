import { Request,
  Response } from 'express';

import BoardServ from '../services/LeaderBoardS';

class QuadroController {
  private service: BoardServ;

  constructor() {
    this.service = new BoardServ();
  }

  public async rankingTime(req: Request, res: Response) {
    const ranking = await this.service.rankingTime();
    const sort = this.service.resultado(ranking);

    return res.status(200).json(sort);
  }

  public async pegandoRanking(req: Request, res: Response) {
    const ranking = await this.service.pegandoRanking();
    const sort = this.service.resultado(ranking);

    return res.status(200).json(sort);
  }

  public async rankingTotal(req: Request, res: Response) {
    const ranking = await this.service.rankingTotal();
    const sort = this.service.resultado(ranking);

    return res.status(200).json(sort);
  }
}

export default QuadroController;
