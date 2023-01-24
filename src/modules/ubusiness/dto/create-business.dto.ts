import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BusinessTypeRoleEnum } from '../common/business-type-role.enum'

export class CreateBusinessDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: true })
  readonly imagelogoUrl: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @IsEnum(BusinessTypeRoleEnum)
  @ApiProperty({
    example: BusinessTypeRoleEnum,
    enum: Object.values(BusinessTypeRoleEnum)
  })
  readonly type: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly phone: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly address: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly subDistrict: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly district: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly province: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly postcode: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly country: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly countryCode: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly taxpayerNumber: string
}
