export class CurrentUserDto {
    /**
     * ID do usuário
     * @example 1
     */
    userId!: number;

    /**
     * Nome do usuário
     * @example Andre Basilato
     */
    name!: string;

    /**
     * Email do usuário
     * @example andre@example.com
     */
    email!: string;

    /**
     * ID da permissão do usuário
     * @example 1
     */
    permissionId!: number;

    /**
     * Nome da permissão do usuário
     * @example Admin
     */
    permissionName!: string;
}