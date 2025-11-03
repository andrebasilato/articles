export class CreatePermissionDto {
    /**
     * Nome da permissão
     * @example Admin
     */
    name!: string;


    /**
     * Descrição da permissão
     * @example Permissão de administrador
     */
    description!: string;
}