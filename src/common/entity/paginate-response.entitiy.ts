import { ApiProperty } from '@nestjs/swagger'

export abstract class PaginateResponseDto<T> {
  abstract get results(): T

  @ApiProperty({ example: 1 })
  total: number

  @ApiProperty({ example: 25 })
  limit: number

  @ApiProperty({ example: 1 })
  page: number

  @ApiProperty({ example: 1 })
  pages: number
}
