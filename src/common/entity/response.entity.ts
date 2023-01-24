import { ApiProperty } from '@nestjs/swagger'

export abstract class ResponseDto<T> {
  abstract get data(): T

  @ApiProperty({ example: 'done' })
  message: string
}
