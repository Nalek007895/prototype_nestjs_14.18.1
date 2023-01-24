import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateUserAccountDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly firstName: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly lastName: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly phone: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly email: string
}
