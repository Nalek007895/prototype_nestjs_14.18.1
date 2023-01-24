import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { SocialTypeRoleEnum } from '../common/social-type-role.enum'

export class CreateSocialAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(SocialTypeRoleEnum)
  @ApiPropertyOptional({
    example: SocialTypeRoleEnum,
    enum: Object.values(SocialTypeRoleEnum)
  })
  readonly type: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly uid: string

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
}
