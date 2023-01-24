import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UserAccountService } from 'src/modules/user-account/services/user-account.service'
import { CreateSocialAccountDto } from '../dto/create-social-account.dto'
import { UpdateSocialAccountDto } from '../dto/update-social-account.dto'
import { SocialAccountService } from '../services/social-account.service'

@Injectable()
export class SocialUserLogic {
  constructor(
    private readonly socialUserService: SocialAccountService,
    private readonly userAccountService: UserAccountService
  ) {}

  async getallSociaLogic() {
    const socialAll = await this.socialUserService.getAll()
    const dataAll = []
    for (let i = 0; i < socialAll.length; i++) {
      const user = await this.userAccountService.findById({
        _id: socialAll[i].userAccountId
      })
      const social = socialAll[i]
      dataAll[i] = { social, user }
    }
    return dataAll
  }
  async createSociaLogic(payload: CreateSocialAccountDto) {
    const socialuserData = await this.socialUserService.findOne({
      status: StatusEnum.ACTIVE,
      uid: payload.uid
    })
    if (socialuserData) {
      throw new BadRequestException(`UID ${payload.uid} already used.`)
    }
    const userdata = await this.userAccountService.create({
      status: StatusEnum.ACTIVE,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      email: payload.email
    })
    const socialdata = await this.socialUserService.create({
      status: StatusEnum.ACTIVE,
      userAccountId: userdata._id,
      type: payload.type,
      uid: payload.uid
    })
    return socialdata
  }
  async updateSociaLogic(id: string, payload: UpdateSocialAccountDto) {
    const userData = await this.socialUserService.findOne({
      status: StatusEnum.ACTIVE,
      uid: payload.uid,
      _id: { $ne: id }
    })

    if (userData) {
      throw new BadRequestException(`UID ${payload.uid} already used.`)
    }

    return await this.socialUserService.update(id, payload)
  }
}
