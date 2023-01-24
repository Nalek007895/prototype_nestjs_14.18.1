import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginUserAccountDto {
  @ApiProperty({ example: 'youUsername' })
  @IsString()
  readonly email: string

  @ApiProperty({ example: 'you-super-secret-password-8756' })
  @IsString()
  readonly password: string
}
