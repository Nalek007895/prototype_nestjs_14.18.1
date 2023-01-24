import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { SocialTypeRoleEnum } from '../common/social-type-role.enum'

export class UpdateSocialAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly uid: string

  @IsString()
  @IsOptional()
  @IsEnum(SocialTypeRoleEnum)
  @ApiPropertyOptional({
    example: SocialTypeRoleEnum,
    enum: Object.values(SocialTypeRoleEnum)
  })
  readonly type: string
}
