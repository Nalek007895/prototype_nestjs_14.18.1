import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthLogic } from 'src/modules/auth/logics/auth.logic'
import { LoginDto } from '../dto/login.dto'
import { LoginUserResponse } from '../entity/user.entity'

@ApiTags('v1/public/user')
@Controller('v1/public/user')
export class UserPublicController {
  constructor(private readonly authLogic: AuthLogic) {}

  @Post('login')
  @ApiOkResponse({ type: () => LoginUserResponse })
  @ApiOperation({ summary: 'Login' })
  async login(@Body() login: LoginDto) {
    const userData = await this.authLogic.loginLogic(login)

    return userData
  }
}
