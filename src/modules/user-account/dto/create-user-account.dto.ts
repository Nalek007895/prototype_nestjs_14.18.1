import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly firstName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly lastName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly phone: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly email: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public password: string
}
