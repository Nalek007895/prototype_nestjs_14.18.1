import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { authorStampCreatePlugin } from 'src/modules/database/author-stamp.plugin'

export type ForgetPasswordDocument = ForgetPasswordFields & mongoose.Document
@Schema({ timestamps: true, strict: true, collection: 'forgetpasswords' })
export class ForgetPasswordFields {
  @Prop({ required: true })
  userAccountId: string

  @Prop({ required: true })
  token: string

  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  expireDate: string

  @Prop({ default: false })
  usUsed: boolean
}

export const ForgetPasswordSchema =
  SchemaFactory.createForClass(ForgetPasswordFields)
ForgetPasswordSchema.plugin(mongoosePaginate)
ForgetPasswordSchema.plugin(authorStampCreatePlugin)
