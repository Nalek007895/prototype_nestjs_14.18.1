import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { ClientSession, Model } from 'mongoose'
import { PaginateModel } from 'mongoose-paginate'
import { StatusEnum } from 'src/common/enum/status.enum'
import { BusinessDocument } from '../schemas/business.schema'

@Injectable({ scope: Scope.REQUEST })
export class BusinessService {
  constructor(
    @InjectModel('business')
    private readonly businessModel: PaginateModel<BusinessDocument> | any,
    @Inject(REQUEST) private request: any
  ) {}

  async resolveByUrl({ id }): Promise<BusinessDocument | any> {
    return this.businessModel.findById({ _id: id })
  }

  getModel(): Model<BusinessDocument> {
    return this.businessModel
  }

  async getSession(): Promise<ClientSession> {
    await this.businessModel.createCollection()
    return await this.businessModel.startSession()
  }

  async transactionCreate(
    payload: any,
    session: ClientSession
  ): Promise<BusinessDocument> {
    const document = new this.businessModel(payload)
    document?.setAuthor(this.request)

    return document.save({ session })
  }

  async create(payload: any): Promise<BusinessDocument> {
    const document = new this.businessModel(payload)
    document?.setAuthor(this.request)

    return document.save()
  }

  async update(id: string, Operator: any): Promise<BusinessDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ ...Operator }).save()
  }

  async delete(id: string): Promise<BusinessDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }

  getAll(): Promise<any[]> {
    return this.businessModel.find()
  }

  findById(id): Promise<any> {
    return this.businessModel.findById(id)
  }

  findOne(condition): Promise<BusinessDocument> {
    return this.businessModel.findOne(condition, { password: 0 })
  }

  findOneWithPassword(condition): Promise<BusinessDocument> {
    return this.businessModel.findOne(condition)
  }

  getOne(condition: any, project?: any): Promise<BusinessDocument> {
    return this.businessModel.findOne(condition, project)
  }
}
