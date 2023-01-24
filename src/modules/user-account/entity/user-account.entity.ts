import { ApiProperty } from '@nestjs/swagger'
import { ResponseDto } from 'src/common/entity/response.entity'

class LoginUserAccountFields {
  @ApiProperty()
  id: string
  @ApiProperty()
  firstName: string
  @ApiProperty()
  lastName: string
  @ApiProperty()
  phone: string
  @ApiProperty()
  email: string
  @ApiProperty()
  token_expire: string
}

export class LoginUserAccountResponse extends ResponseDto<LoginUserAccountFields> {
  @ApiProperty({
    type: LoginUserAccountFields
  })
  data: LoginUserAccountFields

  @ApiProperty()
  access_token: string
}

export class UserAccountResponse extends ResponseDto<any> {
  data: any
}

export class UserWithOutPasswordResponse extends ResponseDto<any> {
  data: any
}
