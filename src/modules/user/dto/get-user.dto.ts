import { IsString, IsOptional } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { StatusEnum } from 'src/common/enum/status.enum'
import { PaginateDto } from 'src/common/dto/paginate.dto'
import { UserRoleEnum } from '../common/role.enum'

export class UserPaginateDto extends PaginateDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'createdAt' })
  readonly sortBy: string = 'createdAt'

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'desc' })
  readonly sortOrder: string = 'desc'

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: StatusEnum.ACTIVE })
  readonly status: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'test' })
  readonly search: string = ''

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: UserRoleEnum.SUPER_ADMIN,
    enum: Object.values(UserRoleEnum)
  })
  readonly role: string = ''

  public buildQuery() {
    return {
      $or: [
        {
          username: {
            $regex: this.search,
            $options: 'i'
          }
        }
      ],
      role: this.role ? this.role : { $ne: null },
      status: this.status || { $ne: StatusEnum.DELETED }
    }
  }
}
