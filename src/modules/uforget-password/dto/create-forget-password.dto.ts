import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateForgetPassword {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly userAccountId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly token: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly type: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly expireDate: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: false })
  readonly usUsed: boolean
}
