import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({ example: 'youUsername' })
  @IsString()
  readonly username: string

  @ApiProperty({ example: 'you-super-secret-password-8756' })
  @IsString()
  readonly password: string
}
