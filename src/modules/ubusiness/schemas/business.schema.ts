import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { StatusEnum } from 'src/common/enum/status.enum'
import { UserStampSchema } from 'src/common/schemas/user-stamp.schema'
import { authorStampCreatePlugin } from 'src/modules/database/author-stamp.plugin'

export type BusinessDocument = BusinessFields & mongoose.Document
@Schema({ timestamps: true, strict: true, collection: 'business' })
export class BusinessFields {
  @Prop()
  imagelogoUrl: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  subDistrict: string

  @Prop({ required: true })
  district: string

  @Prop({ required: true })
  province: string

  @Prop({ required: true })
  postcode: string

  @Prop({ required: true })
  country: string

  @Prop({ required: true })
  countryCode: string

  @Prop({ required: true })
  taxpayerNumber: string

  @Prop({ default: StatusEnum.ACTIVE, enum: Object.values(StatusEnum) })
  status: string

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createBy: UserStampSchema
}

export const BusinessSchema = SchemaFactory.createForClass(BusinessFields)
BusinessSchema.plugin(mongoosePaginate)
BusinessSchema.plugin(authorStampCreatePlugin)
