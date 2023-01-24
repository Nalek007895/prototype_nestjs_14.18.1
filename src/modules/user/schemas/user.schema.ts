import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UserStampSchema } from 'src/common/schemas/user-stamp.schema'
import { authorStampCreatePlugin } from '../../database/author-stamp.plugin'
import { UserRoleEnum } from '../common/role.enum'

export type UserDocument = UserFields & mongoose.Document
@Schema({ timestamps: true, strict: true, collection: 'users' })
export class UserFields {
  @Prop({ required: true, index: true })
  username: string

  @Prop()
  password: string

  @Prop({
    default: UserRoleEnum.SUPER_ADMIN,
    enum: Object.values(UserRoleEnum)
  })
  role: string

  @Prop({ default: StatusEnum.ACTIVE, enum: Object.values(StatusEnum) })
  status: string

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createdBy: UserStampSchema
}

export const UserSchema = SchemaFactory.createForClass(UserFields)
UserSchema.plugin(mongoosePaginate)
UserSchema.plugin(authorStampCreatePlugin)
