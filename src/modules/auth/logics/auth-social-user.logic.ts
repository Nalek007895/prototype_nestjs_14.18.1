import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
//import * as bcrypt from 'bcryptjs'
import { LoginSocialUserAccountDto } from 'src/modules/social-account/dto/login-social-user.dto'
import { SocialAccountService } from 'src/modules/social-account/services/social-account.service'

@Injectable()
export class AuthSocialUserLogic {
  constructor(
    private readonly socialUserService: SocialAccountService,
    private readonly jwtService: JwtService
  ) {}

  async loginSocialLogic(login: LoginSocialUserAccountDto) {
    const userData = await this.socialUserService.findOneWithUID({
      type: login.type
    })

    const now = new Date()

    if (!userData) {
      throw new UnauthorizedException()
    }

    const validateUser = (login.uid, userData.uid)
    if (!validateUser) {
      throw new UnauthorizedException()
    }

    const payload = {
      id: userData.id,
      firstName: userData.userAccountId,
      lastName: userData.type,
      phone: userData.uid
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
