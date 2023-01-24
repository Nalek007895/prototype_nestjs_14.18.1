import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { StatusEnum } from 'src/common/enum/status.enum'
import { AdminAuthGuard } from 'src/modules/auth/guards/admin-auth.guard'
import { ChangeUserPwdDto } from '../dto/change-user-pwd.dto'
import { CreateUserDto } from '../dto/create-user.dto'
import { UserPaginateDto } from '../dto/get-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import {
  GetAllUserResponse,
  UserResponse,
  UserWithOutPasswordResponse
} from '../entity/user.entity'
import { UserLogic } from '../logics/user.logic'
import { UserService } from '../services/user.service'

//@ApiBearerAuth()
@ApiTags('v1/users')
@Controller('v1/users')
//@UseGuards(AdminAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userLogic: UserLogic
  ) {}

  @Get()
  @ApiOkResponse({ type: () => GetAllUserResponse })
  @ApiOperation({ summary: 'Get User List' })
  async getUsers(@Query() query: UserPaginateDto) {
    return await this.userService.paginate(query.buildQuery(), query)
  }

  @Get(':id')
  @ApiOkResponse({ type: () => UserWithOutPasswordResponse })
  @ApiOperation({ summary: 'Get User By ID' })
  async getUser(@Param('id') id: string) {
    return await this.userService.findOne({ _id: id })
  }

  @Post()
  @ApiCreatedResponse({ type: () => UserResponse })
  @ApiOperation({ summary: 'Create User' })
  async createUser(@Body() user: CreateUserDto) {
    return this.userLogic.createUserLogic(user)
  }

  @Put(':id')
  @ApiOkResponse({ type: () => UserResponse })
  @ApiOperation({ summary: 'Update User' })
  async userUpdate(@Body() user: UpdateUserDto, @Param('id') id: string) {
    return this.userLogic.updateUserLogic(id, user)
  }

  @Put(':id/password')
  @ApiOkResponse({ type: () => UserResponse })
  @ApiOperation({ summary: 'Change User Password' })
  async changePasswordUpdate(
    @Body() user: ChangeUserPwdDto,
    @Param('id') id: string
  ) {
    return this.userLogic.changeUserPasswordLogic(id, user)
  }

  @Delete()
  @ApiOkResponse({ type: () => UserResponse })
  @ApiOperation({ summary: 'Delete User' })
  async deleteUser(@Query('id') id: string) {
    return this.userService.update(id, { status: StatusEnum.DELETED })
  }
}
