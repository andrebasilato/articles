export class SigninDto {
  /**
   * Email do usuário
   * @example user@example.com
   */
  email!: string;

  /**
   * Senha do usuário
   * @example 123456
   */
  password!: string;
}