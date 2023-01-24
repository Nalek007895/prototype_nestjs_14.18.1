import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { UserRoleEnum } from '../common/role.enum'

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly username: string

  @IsString()
  @IsOptional()
  @IsEnum(UserRoleEnum)
  @ApiPropertyOptional({
    example: UserRoleEnum.SUPER_ADMIN,
    enum: Object.values(UserRoleEnum)
  })
  readonly role: string
}
