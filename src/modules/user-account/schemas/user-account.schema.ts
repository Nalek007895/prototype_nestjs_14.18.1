import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UserStampSchema } from 'src/common/schemas/user-stamp.schema'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { authorStampCreatePlugin } from 'src/modules/database/author-stamp.plugin'

export type UserAccountDocument = UserAccountFields & mongoose.Document
@Schema({ timestamps: true, strict: true, collection: 'useraccount' })
export class UserAccountFields {
  @Prop({ required: true, index: true })
  firstName: string

  @Prop({ required: true, index: true })
  lastName: string

  @Prop({ required: true, index: true })
  phone: string

  @Prop({ required: true, index: true })
  email: string

  @Prop()
  password: string

  @Prop({ default: StatusEnum.ACTIVE, enum: Object.values(StatusEnum) })
  status: string

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createBy: UserStampSchema
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccountFields)
UserAccountSchema.plugin(mongoosePaginate)
UserAccountSchema.plugin(authorStampCreatePlugin)
