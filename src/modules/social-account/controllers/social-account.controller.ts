import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { StatusEnum } from 'src/common/enum/status.enum'
import { AuthSocialUserLogic } from 'src/modules/auth/logics/auth-social-user.logic'
import { CreateSocialAccountDto } from '../dto/create-social-account.dto'
import { LoginSocialUserAccountDto } from '../dto/login-social-user.dto'
import { UpdateSocialAccountDto } from '../dto/update-social-account.dto'
import { SocialUserLogic } from '../logics/social-account.logic'
import { SocialAccountService } from '../services/social-account.service'

@ApiTags('v1/socialuser')
@Controller('v1/socialuser')
export class SocialUserController {
  constructor(
    private readonly socialUserService: SocialAccountService,
    private readonly socialUserLogic: SocialUserLogic,
    private readonly authSocialUserLogin: AuthSocialUserLogic
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Social User List' })
  async getSocialUser() {
    return await this.socialUserLogic.getallSociaLogic()
  }

  @Post()
  @ApiOperation({ summary: 'Create Social User' })
  async createSocialUser(@Body() user: CreateSocialAccountDto) {
    return this.socialUserLogic.createSociaLogic(user)
  }

  @Post('login')
  @ApiOperation({ summary: 'Login Social User' })
  async loginSocialUser(@Body() login: LoginSocialUserAccountDto) {
    const userData = await this.authSocialUserLogin.loginSocialLogic(login)
    return userData
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Social User' })
  async updateSocialUser(
    @Body() user: UpdateSocialAccountDto,
    @Param('id') id: string
  ) {
    return this.socialUserLogic.updateSociaLogic(id, user)
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Social User' })
  async deleteUser(@Query('id') id: string) {
    return this.socialUserService.update(id, { status: StatusEnum.DELETED })
  }
}
