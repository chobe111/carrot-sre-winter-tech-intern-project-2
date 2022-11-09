import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { SubnetService } from './subnet.service';
import { Response } from 'express';
@Controller('carrot/v1/subnet')
export class SubnetController {
  constructor(private readonly subnetService: SubnetService) {}

  @Get('')
  async getSubnetInformation(@Query('regionName') regionName: string) {
    return await this.subnetService.getInformation(regionName);
  }

  @Get('/test')
  async testSubnetInformation(@Query('regionName') regionName: string) {
    return await this.subnetService.getInformation(regionName);
  }
}
