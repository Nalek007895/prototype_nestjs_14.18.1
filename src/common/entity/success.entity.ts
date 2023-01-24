import { ApiProperty } from '@nestjs/swagger'
import { ResponseDto } from './response.entity'

export class SuccessField {
  @ApiProperty()
  success: boolean
}
export class SuccessObjectResponse extends ResponseDto<SuccessField> {
  @ApiProperty({ type: SuccessField, example: { success: true } })
  data: SuccessField
}
