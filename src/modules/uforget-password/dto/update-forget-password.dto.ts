import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateForgetPassword {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ required: true })
  readonly userAccountId: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ required: true })
  readonly token: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ required: true })
  readonly type: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ required: true })
  readonly expireDate: string

  @IsString()
  @IsOptional()
  @ApiProperty({ default: true })
  readonly usUsed: boolean
}
