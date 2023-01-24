import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { StatusEnum } from 'src/common/enum/status.enum'
import { CreateBusinessDto } from '../dto/create-business.dto'
import { UpdateBusinessDto } from '../dto/update-business.dto'
import { BusinessLogic } from '../logics/business.logic'
import { BusinessService } from '../services/business.service'

@ApiTags('v1/business')
@Controller('v1/business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly businessLogic: BusinessLogic
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Business List' })
  async getUsers() {
    return await this.businessService.getAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Business By ID' })
  async getUser(@Param('id') id: string) {
    return await this.businessService.findOne({ _id: id })
  }

  @Post()
  @ApiOperation({ summary: 'Create Business' })
  async createUser(@Body() business: CreateBusinessDto) {
    return this.businessLogic.createBusinessLogic(business)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User' })
  async userUpdate(
    @Body() business: UpdateBusinessDto,
    @Param('id') id: string
  ) {
    return this.businessLogic.updateBusinessLogic(id, business)
  }

  @Delete()
  @ApiOperation({ summary: 'Delete User' })
  async deleteUser(@Query('id') id: string) {
    return this.businessService.update(id, { status: StatusEnum.DELETED })
  }
}
