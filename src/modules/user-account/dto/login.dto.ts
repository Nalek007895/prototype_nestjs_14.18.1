import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginUserAccountDto {
  @ApiProperty({ example: 'youUsername' })
  @IsString()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({ example: 'you-super-secret-password-8756' })
  @IsString()
  @IsNotEmpty()
  readonly password: string
}
