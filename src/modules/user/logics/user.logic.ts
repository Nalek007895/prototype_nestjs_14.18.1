import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { UserService } from '../services/user.service'
import * as bcrypt from 'bcryptjs'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UpdateUserDto } from '../dto/update-user.dto'
import { ChangeUserPwdDto } from '../dto/change-user-pwd.dto'

@Injectable()
export class UserLogic {
  constructor(private readonly userService: UserService) {}

  async createUserLogic(payload: CreateUserDto) {
    const userData = await this.userService.findOne({
      status: StatusEnum.ACTIVE,
      username: payload.username
    })

    if (userData) {
      throw new BadRequestException(
        `Username ${payload.username} already used.`
      )
    }

    const salt = bcrypt.genSaltSync(10)
    payload.password = bcrypt.hashSync(payload.password, salt)

    return this.userService.create(payload)
  }

  async updateUserLogic(id: string, payload: UpdateUserDto) {
    const userData = await this.userService.findOne({
      status: StatusEnum.ACTIVE,
      username: payload.username,
      _id: { $ne: id }
    })

    if (userData) {
      throw new BadRequestException(
        `Username ${payload.username} already used.`
      )
    }

    return await this.userService.update(id, payload)
  }

  async changeUserPasswordLogic(id: string, payload: ChangeUserPwdDto) {
    const salt = bcrypt.genSaltSync(10)
    payload.password = bcrypt.hashSync(payload.password, salt)
    return await this.userService.update(id, payload)
  }
}
