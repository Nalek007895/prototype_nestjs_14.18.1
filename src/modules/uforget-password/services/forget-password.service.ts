import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { ClientSession, Model } from 'mongoose'
import { PaginateModel } from 'mongoose-paginate'
import { StatusEnum } from 'src/common/enum/status.enum'
import { ForgetPasswordDocument } from '../schemas/forget-password.schema'

@Injectable({ scope: Scope.REQUEST })
export class ForgetPasswordService {
  constructor(
    @InjectModel('forgetpassword')
    private readonly forgetpasswordModel:
      | PaginateModel<ForgetPasswordDocument>
      | any,
    @Inject(REQUEST) private request: any
  ) {}

  async resolveByUrl({ id }): Promise<ForgetPasswordDocument | any> {
    return this.forgetpasswordModel.findById({ _id: id })
  }

  getModel(): Model<ForgetPasswordDocument> {
    return this.forgetpasswordModel
  }

  async getSession(): Promise<ClientSession> {
    await this.forgetpasswordModel.createCollection()
    return await this.forgetpasswordModel.startSession()
  }

  async transactionCreate(
    payload: any,
    session: ClientSession
  ): Promise<ForgetPasswordDocument> {
    const document = new this.forgetpasswordModel(payload)
    document?.setAuthor(this.request)

    return document.save({ session })
  }

  async create(payload: any): Promise<ForgetPasswordDocument> {
    const document = new this.forgetpasswordModel(payload)
    document?.setAuthor(this.request)

    return document.save()
  }

  async update(id: string, Operator: any): Promise<ForgetPasswordDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ ...Operator }).save()
  }

  async delete(id: string): Promise<ForgetPasswordDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }

  getAll(): Promise<any[]> {
    return this.forgetpasswordModel.find()
  }

  findById(id): Promise<any> {
    return this.forgetpasswordModel.findById(id)
  }

  findOne(condition): Promise<ForgetPasswordDocument> {
    return this.forgetpasswordModel.findOne(condition, { password: 0 })
  }

  findOneWithPassword(condition): Promise<ForgetPasswordDocument> {
    return this.forgetpasswordModel.findOne(condition)
  }

  getOne(condition: any, project?: any): Promise<ForgetPasswordDocument> {
    return this.forgetpasswordModel.findOne(condition, project)
  }
}
