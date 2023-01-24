import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UserStampSchema } from 'src/common/schemas/user-stamp.schema'
import { authorStampCreatePlugin } from 'src/modules/database/author-stamp.plugin'

export type LogDocument = LogFields & mongoose.Document

@Schema({
  timestamps: true,
  collection: 'accessLogs'
})
export class LogFields {
  @Prop({ default: StatusEnum.ACTIVE, enum: Object.values(StatusEnum) })
  status: string

  @Prop()
  ip: string

  @Prop()
  baseUrl: string

  @Prop()
  originalUrl: string

  @Prop()
  headers: mongoose.Schema.Types.Mixed

  @Prop()
  body: mongoose.Schema.Types.Mixed

  @Prop()
  params: mongoose.Schema.Types.Mixed

  @Prop()
  query: mongoose.Schema.Types.Mixed

  @Prop()
  method: string

  @Prop()
  note: string

  @Prop()
  req: mongoose.Schema.Types.Mixed

  @Prop()
  remark: mongoose.Schema.Types.Mixed

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createdBy: UserStampSchema
}

export const LogSchema = SchemaFactory.createForClass(LogFields)
LogSchema.plugin(mongoosePaginate)
LogSchema.plugin(authorStampCreatePlugin)
