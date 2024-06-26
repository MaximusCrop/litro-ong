import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ProposalsDto {
  /**
   * @example 'Colecta en Cordoba Capital'
   */
  @IsNotEmpty({ message: 'El titulo es requerido' })
  @IsString({ message: 'El titulo debe ser una cadena de caracteres' })
  @MaxLength(70, { message: 'El titulo debe tener menos de 70 caracteres' })
  title: string;

  /**
   * @example 'Tengo un negocio de ropa, que pueden usar como punto de colecta el dia 17 de febrero'
   */
  @IsNotEmpty()
  @IsString()
  description: string;
}
