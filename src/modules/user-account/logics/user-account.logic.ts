import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { StatusEnum } from 'src/common/enum/status.enum'
import * as bcrypt from 'bcryptjs'
import { UserAccountService } from '../services/user-account.service'
import { CreateUserAccountDto } from '../dto/create-user-account.dto'
import { UpdateUserAccountDto } from '../dto/update-user-account.dto'
import { ChangeUserAccountPwdDto } from '../dto/change-user-account-pwd.dto'

@Injectable()
export class UserAccountLogic {
  constructor(private readonly userAccountService: UserAccountService) {}

  async createUserAccountLogic(payload: CreateUserAccountDto) {
    const userDataEmail = await this.userAccountService.findOne({
      status: StatusEnum.ACTIVE,
      email: payload.email
    })
    const userDataPhone = await this.userAccountService.findOne({
      status: StatusEnum.ACTIVE,
      phone: payload.phone
    })

    if (userDataEmail) {
      throw new BadRequestException(`Email ${payload.email} already used.`)
    } else if (userDataPhone) {
      throw new BadRequestException(
        `NumberPhone ${payload.phone} already used.`
      )
    }

    const salt = bcrypt.genSaltSync(10)
    payload.password = bcrypt.hashSync(payload.password, salt)

    return this.userAccountService.create(payload)
  }
  async updateUserAccountLogic(id: string, payload: UpdateUserAccountDto) {
    const userDataEmail = await this.userAccountService.findOne({
      status: StatusEnum.ACTIVE,
      email: payload.email
    })
    const userDataPhone = await this.userAccountService.findOne({
      status: StatusEnum.ACTIVE,
      phone: payload.phone
    })

    if (userDataEmail) {
      throw new BadRequestException(`Email ${payload.email} already used.`)
    } else if (userDataPhone) {
      throw new BadRequestException(
        `NumberPhone ${payload.phone} already used.`
      )
    }

    return await this.userAccountService.update(id, payload)
  }

  async changeUserPasswordLogic(id: string, payload: ChangeUserAccountPwdDto) {
    const salt = bcrypt.genSaltSync(10)
    payload.password = bcrypt.hashSync(payload.password, salt)
    return await this.userAccountService.update(id, payload)
  }
}
