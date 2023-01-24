import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ChangeUserAccountPwdDto {
  @IsString()
  @ApiProperty()
  public password: string
}
