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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { StatusEnum } from 'src/common/enum/status.enum'
import { ChangeUserAccountPwdDto } from '../dto/change-user-account-pwd.dto'
import { CreateUserAccountDto } from '../dto/create-user-account.dto'
import { LoginUserAccountDto } from '../dto/login.dto'
import { UpdateUserAccountDto } from '../dto/update-user-account.dto'
import { UserAccountLogic } from '../logics/user-account.logic'
import { UserAccountService } from '../services/user-account.service'
import { AuthLogic } from 'src/modules/auth/logics/auth.logic'
import {
  LoginUserAccountResponse,
  UserAccountResponse
} from '../entity/user-account.entity'

@ApiTags('v1/useraccount')
@Controller('v1/useraccount')
export class UserAccountController {
  constructor(
    private readonly userAccountService: UserAccountService,
    private readonly userAccountLogic: UserAccountLogic,
    private readonly authLogic: AuthLogic
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get User List' })
  async getOperators() {
    return await this.userAccountService.getAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User By ID' })
  async getUser(@Param('id') id: string) {
    return await this.userAccountService.findOne({ _id: id })
  }

  @Post()
  @ApiCreatedResponse({ type: () => UserAccountResponse })
  @ApiOperation({ summary: 'Create User' })
  async createUser(@Body() user: CreateUserAccountDto) {
    return this.userAccountLogic.createUserAccountLogic(user)
  }

  @Post('login')
  @ApiOkResponse({ type: () => LoginUserAccountResponse })
  @ApiOperation({ summary: 'Login' })
  async login(@Body() login: LoginUserAccountDto) {
    const userData = await this.authLogic.UserAccountloginLogic(login)
    return userData
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User' })
  async userUpdate(
    @Body() user: UpdateUserAccountDto,
    @Param('id') id: string
  ) {
    return this.userAccountLogic.updateUserAccountLogic(id, user)
  }

  @Put(':id/password')
  @ApiOperation({ summary: 'Change User Password' })
  async changePasswordUpdate(
    @Body() user: ChangeUserAccountPwdDto,
    @Param('id') id: string
  ) {
    return this.userAccountLogic.changeUserPasswordLogic(id, user)
  }

  @Delete()
  @ApiOperation({ summary: 'Delete User' })
  async deleteUser(@Query('id') id: string) {
    return this.userAccountService.update(id, { status: StatusEnum.DELETED })
  }
}
