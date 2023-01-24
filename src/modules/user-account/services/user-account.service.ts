import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PaginateModel } from 'mongoose-paginate'
import { ClientSession } from 'mongodb'
import { UserAccountDocument } from '../schemas/user-account.schema'
import { StatusEnum } from 'src/common/enum/status.enum'

@Injectable({ scope: Scope.REQUEST })
export class UserAccountService {
  constructor(
    @InjectModel('useraccount')
    private readonly userAccountModel: PaginateModel<UserAccountDocument> | any,
    @Inject(REQUEST) private request: any
  ) {}

  async resolveByUrl({ id }): Promise<UserAccountDocument | any> {
    return this.userAccountModel.findById({ _id: id })
  }

  getModel(): Model<UserAccountDocument> {
    return this.userAccountModel
  }

  async getSession(): Promise<ClientSession> {
    await this.userAccountModel.createCollection()
    return await this.userAccountModel.startSession()
  }

  async transactionCreate(
    payload: any,
    session: ClientSession
  ): Promise<UserAccountDocument> {
    const document = new this.userAccountModel(payload)
    document?.setAuthor(this.request)

    return document.save({ session })
  }

  async create(payload: any): Promise<UserAccountDocument> {
    const document = new this.userAccountModel(payload)
    document?.setAuthor(this.request)

    return document.save()
  }

  async update(id: string, Operator: any): Promise<UserAccountDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ ...Operator }).save()
  }

  async delete(id: string): Promise<UserAccountDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }

  getAll(): Promise<any[]> {
    return this.userAccountModel.find()
  }

  findById(id): Promise<any> {
    return this.userAccountModel.findById(id)
  }

  findOne(condition): Promise<UserAccountDocument> {
    return this.userAccountModel.findOne(condition, { password: 0 })
  }

  findOneWithPassword(condition): Promise<UserAccountDocument> {
    return this.userAccountModel.findOne(condition)
  }

  getOne(condition: any, project?: any): Promise<UserAccountDocument> {
    return this.userAccountModel.findOne(condition, project)
  }
}
