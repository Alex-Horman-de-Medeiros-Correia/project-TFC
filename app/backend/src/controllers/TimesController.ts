import { Request,
  Response } from 'express';

import TimesS from '../services/TimesS';

class TimeC {
  private service: TimesS;

  constructor() {
    this.service = new TimesS();
  }

  public async todosTimes(req: Request, res: Response) {
    const teams = await this.service.getTeams();

    return res.status(200).json(teams);
  }

  // rever melhor essa parte para maior compreenssão do todo

  public async timeId(req: Request, res: Response) {
    const { id } = req.params;

    const [team] = await this.service.timesId(Number(id));

    return res.status(200).json(team);
    // ...
  }
}

export default TimeC;
