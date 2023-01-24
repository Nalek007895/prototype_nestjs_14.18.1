import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ChangeUserPwdDto {
  @IsString()
  @ApiProperty()
  public password: string
}
