import * as bcrypt from 'bcryptjs';

export default class VerificarSenha {
  public static senha = (password: string) => {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    return hash;
  };

  /* class Pass {
    public static senha = (password) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(salt);
      return hash;
    }; */

  public static senhaComparada = (password: string, senha: any) =>
    bcrypt.compareSync(password, senha);
}
