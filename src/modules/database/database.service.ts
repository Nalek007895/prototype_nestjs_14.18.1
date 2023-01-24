import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection, ClientSession, Model, Document } from 'mongoose'

@Injectable()
export class DatabaseService {
  private static _this: DatabaseService

  constructor(@InjectConnection() public readonly connection: Connection) {
    DatabaseService._this = this
  }

  static getModel<T extends Document = any>(modelName): Model<T> {
    return DatabaseService._this.connection.models[modelName]
  }

  static async startSession(): Promise<ClientSession> {
    return DatabaseService._this.connection.startSession()
  }
}
