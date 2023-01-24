import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/modules/user/services/user.service'
import { LoginDto } from '../../user/dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UserAccountService } from 'src/modules/user-account/services/user-account.service'
import { LoginUserAccountDto } from 'src/modules/user-account/dto/login.dto'

@Injectable()
export class AuthLogic {
  constructor(
    private readonly userService: UserService,
    private readonly userAccountService: UserAccountService,
    private readonly jwtService: JwtService
  ) {}

  async loginLogic(login: LoginDto) {
    const userData = await this.userService.findOneWithPassword({
      username: login.username
    })

    const now = new Date()

    if (!userData) {
      throw new UnauthorizedException()
    }

    const validateUser = await bcrypt.compare(login.password, userData.password)
    if (!validateUser) {
      throw new UnauthorizedException()
    }

    const payload = {
      username: userData.username,
      id: userData.id,
      role: userData.role
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.SECRET_ADMIN
    })

    return {
      ...payload,
      accessToken,
      tokenExpire: now.setDate(now.getDate() + 7)
    }
  }

  async UserAccountloginLogic(login: LoginUserAccountDto) {
    const userData = await this.userAccountService.findOneWithPassword({
      email: login.email
    })

    const now = new Date()

    if (!userData) {
      throw new UnauthorizedException()
    }

    const validateUser = await bcrypt.compare(login.password, userData.password)
    if (!validateUser) {
      throw new UnauthorizedException()
    }

    const payload = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      email: userData.email
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.SECRET_ADMIN
    })

    return {
      ...payload,
      accessToken,
      tokenExpire: now.setDate(now.getDate() + 7)
    }
  }
}
