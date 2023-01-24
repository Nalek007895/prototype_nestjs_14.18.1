import { InjectModel } from '@nestjs/mongoose'
import { Inject, Injectable, Scope } from '@nestjs/common'
import { PaginateModel, PaginateResult } from 'mongoose-paginate'
import { ClientSession } from 'mongodb'
import { REQUEST } from '@nestjs/core'
import { Model } from 'mongoose'
import { UserDocument } from '../schemas/user.schema'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UserPaginateDto } from '../dto/get-user.dto'

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly UserModel: PaginateModel<UserDocument> | any,
    @Inject(REQUEST) private request: any
  ) {}

  async resolveByUrl({ id }): Promise<UserDocument | any> {
    return this.UserModel.findById({ _id: id })
  }

  async isExists(condition: any): Promise<boolean> {
    const result = await this.UserModel.findOne(condition)

    return result ? true : false
  }

  getModel(): Model<UserDocument> {
    return this.UserModel
  }

  async getSession(): Promise<ClientSession> {
    await this.UserModel.createCollection()

    return await this.UserModel.startSession()
  }

  async transactionCreate(
    payload: any,
    session: ClientSession
  ): Promise<UserDocument> {
    const document = new this.UserModel(payload)
    document?.setAuthor(this.request)

    return document.save({ session })
  }

  async create(payload: any): Promise<UserDocument> {
    const document = new this.UserModel(payload)
    document?.setAuthor(this.request)

    return document.save()
  }

  async update(id: string, User: any): Promise<UserDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ ...User }).save()
  }

  async delete(id: string): Promise<UserDocument> {
    const document = await this.resolveByUrl({ id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }

  getAll(condition, project?: any): Promise<any[]> {
    return this.UserModel.find(condition, project)
  }

  findById(id): Promise<any> {
    return this.UserModel.findById(id)
  }

  findOne(condition): Promise<UserDocument> {
    return this.UserModel.findOne(condition, { password: 0 })
  }

  findOneWithPassword(condition): Promise<UserDocument> {
    return this.UserModel.findOne(condition)
  }

  getOne(condition: any, project?: any): Promise<UserDocument> {
    return this.UserModel.findOne(condition, project)
  }

  paginate(
    query: any,
    queryParam: UserPaginateDto,
    select?: any
  ): Promise<PaginateResult<UserDocument>> {
    const options = {
      page: Number(queryParam.page),
      limit: Number(queryParam.limit),
      sort: { [queryParam.sortBy]: queryParam.sortOrder },
      select
    }

    return this.UserModel.paginate(query, options)
  }
}
