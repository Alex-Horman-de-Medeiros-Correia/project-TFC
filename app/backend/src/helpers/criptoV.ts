import * as bcrypt from 'bcryptjs';

export default class PasswordVerifier {
  public static passwordCrypt = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  public static passwordCompare = (password: string, passwordCrypt: any) =>
    bcrypt.compareSync(password, passwordCrypt);
}
