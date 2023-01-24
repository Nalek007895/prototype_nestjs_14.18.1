import { ApiProperty } from '@nestjs/swagger'
import { PaginateResponseDto } from 'src/common/entity/paginate-response.entitiy'
import { ResponseDto } from 'src/common/entity/response.entity'

class LoginUserFields {
  @ApiProperty()
  username: string
  @ApiProperty()
  id: string
  @ApiProperty()
  role: string
  @ApiProperty()
  token_expire: string
}

export class LoginUserResponse extends ResponseDto<LoginUserFields> {
  @ApiProperty({
    type: LoginUserFields,
    example: {
      username: 'superadmin',
      id: '6318d06a1fa78236d380db83',
      role: 'SUPER_ADMIN',
      token_expire: 1668165517453
    }
  })
  data: LoginUserFields

  @ApiProperty({ example: '<access-token>' })
  access_token: string
}

class GetAllUserObject extends PaginateResponseDto<any[]> {
  @ApiProperty({
    example: [
      {
        status: 'active',
        role: 'SUPER_ADMIN',
        password:
          '$2b$10$Rwr1n7umjOT9LX9NwdrbqeucI1UP3/Zp1oQP.9AHmv45cJs4XjUKu',
        username: 'superadmin',
        created_at: '2022-09-07T17:10:02.187Z',
        updated_at: '2022-09-07T17:10:02.187Z',
        updated_by: {
          username: 'system',
          id: '0'
        },
        created_by: {
          username: 'system',
          id: '0'
        },
        id: '6318d06a1fa78236d380db83'
      }
    ]
  })
  results: any[]
}

export class GetAllUserResponse extends ResponseDto<GetAllUserObject> {
  @ApiProperty()
  data: GetAllUserObject
}

export class UserResponse extends ResponseDto<any> {
  @ApiProperty({
    example: {
      status: 'active',
      role: 'SUPER_ADMIN',
      password: '$2b$10$Rwr1n7umjOT9LX9NwdrbqeucI1UP3/Zp1oQP.9AHmv45cJs4XjUKu',
      username: 'superadmin',
      created_at: '2022-09-07T17:10:02.187Z',
      updated_at: '2022-09-07T17:10:02.187Z',
      updated_by: {
        username: 'system',
        id: '0'
      },
      created_by: {
        username: 'system',
        id: '0'
      },
      id: '6318d06a1fa78236d380db83'
    }
  })
  data: any
}
export class UserWithOutPasswordResponse extends ResponseDto<any> {
  @ApiProperty({
    example: {
      status: 'active',
      role: 'SUPER_ADMIN',
      username: 'superadmin',
      created_at: '2022-09-07T17:10:02.187Z',
      updated_at: '2022-09-07T17:10:02.187Z',
      updated_by: {
        username: 'system',
        id: '0'
      },
      created_by: {
        username: 'system',
        id: '0'
      },
      id: '6318d06a1fa78236d380db83'
    }
  })
  data: any
}
