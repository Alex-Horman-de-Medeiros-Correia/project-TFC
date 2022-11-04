import * as express from 'express';
import QuadroRotas from './routes/QuadroRotas';
import PartidaRotas from './routes/PartidaRotas';
import LoginRotas from './routes/LoginRotas';
import TimesRotas from './routes/TimesRotas';

class App {
  public app: express.Express;
  constructor() {
    this.app = express();
    this.config();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(LoginRotas);
    this.app.use(TimesRotas);
    this.app.use(PartidaRotas);
    this.app.use(QuadroRotas);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}
export { App };
// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
