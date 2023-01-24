import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { StatusEnum } from 'src/common/enum/status.enum'
import { authorStampCreatePlugin } from 'src/modules/database/author-stamp.plugin'

export type SocialUserDocument = SocialUserFields & mongoose.Document
@Schema({ timestamps: true, strict: true, collection: 'socialusers' })
export class SocialUserFields {
  @Prop()
  userAccountId: string

  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  uid: string

  @Prop({ default: StatusEnum.ACTIVE, enum: Object.values(StatusEnum) })
  status: string
}

export const SocialUserSchema = SchemaFactory.createForClass(SocialUserFields)
SocialUserSchema.plugin(mongoosePaginate)
SocialUserSchema.plugin(authorStampCreatePlugin)
