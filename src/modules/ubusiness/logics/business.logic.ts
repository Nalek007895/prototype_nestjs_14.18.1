import { BadRequestException, Injectable } from '@nestjs/common'
import { StatusEnum } from 'src/common/enum/status.enum'
import { CreateBusinessDto } from '../dto/create-business.dto'
import { UpdateBusinessDto } from '../dto/update-business.dto'
import { BusinessService } from '../services/business.service'

@Injectable()
export class BusinessLogic {
  constructor(private readonly businessService: BusinessService) {}

  async createBusinessLogic(payload: CreateBusinessDto) {
    const businessData = await this.businessService.findOne({
      status: StatusEnum.ACTIVE,
      name: payload.name
    })

    if (businessData) {
      throw new BadRequestException(
        `Businessname ${payload.name} already used.`
      )
    }

    return this.businessService.create(payload)
  }

  async updateBusinessLogic(id: string, payload: UpdateBusinessDto) {
    const businessData = await this.businessService.findOne({
      status: StatusEnum.ACTIVE,
      name: payload.name
    })

    if (businessData) {
      throw new BadRequestException(
        `Businessname ${payload.name} already used.`
      )
    }

    return this.businessService.update(id, payload)
  }
}
