import { Injectable } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators'
import { Scope } from '@nestjs/common/interfaces'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { PaginateModel } from 'mongoose-paginate'
import { StatusEnum } from 'src/common/enum/status.enum'
import { SocialUserDocument } from '../schemas/social-account.schema'

@Injectable({ scope: Scope.REQUEST })
export class SocialAccountService {
  constructor(
    @InjectModel('socialuser')
    readonly SocialUserModel: PaginateModel<SocialUserDocument> | any,
    @Inject(REQUEST) private request: any
  ) {}

  async resolveByUrl({ id }): Promise<SocialUserDocument | any> {
    return this.SocialUserModel.findById({ _id: id })
  }

  getAll(): Promise<any[]> {
    return this.SocialUserModel.find()
  }

  findById(id): Promise<any> {
    return this.SocialUserModel.findById(id)
  }

  findOne(condition): Promise<SocialUserDocument> {
    return this.SocialUserModel.findOne(condition, { password: 0 })
  }

  findOneWithUID(condition): Promise<SocialUserDocument> {
    return this.SocialUserModel.findOne(condition)
  }

  async create(payload: any): Promise<SocialUserDocument> {
    const document = new this.SocialUserModel(payload)
    document?.setAuthor(this.request)

    return document.save()
  }

  async update(id: string, User: any): Promise<SocialUserDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ ...User }).save()
  }

  async delete(id: string): Promise<SocialUserDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }
}
