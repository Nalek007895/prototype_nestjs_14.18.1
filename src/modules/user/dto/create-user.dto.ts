import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { UserRoleEnum } from '../common/role.enum'
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public password: string

  @IsString()
  @IsOptional()
  @IsEnum(UserRoleEnum)
  @ApiPropertyOptional({
    example: UserRoleEnum.SUPER_ADMIN,
    enum: Object.values(UserRoleEnum)
  })
  readonly role: string
}
