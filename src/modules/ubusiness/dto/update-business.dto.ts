import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { BusinessTypeRoleEnum } from '../common/business-type-role.enum'

export class UpdateBusinessDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly imagelogoUrl: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly name: string

  @IsString()
  @IsOptional()
  @IsEnum(BusinessTypeRoleEnum)
  @ApiProperty({
    example: BusinessTypeRoleEnum,
    enum: Object.values(BusinessTypeRoleEnum)
  })
  readonly type: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly phone: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly address: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly subDistrict: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly district: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly province: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly postcode: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly country: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly countryCode: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly taxpayerNumber: string
}
