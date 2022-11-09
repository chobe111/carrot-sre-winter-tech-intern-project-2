import { Controller, Get, Query } from '@nestjs/common';
import { VpcResponse } from './dto/vpc.response';
import { VpcService } from './vpc.service';

@Controller('carrot/v1/vpc')
export class VpcController {
  constructor(private readonly vpcService: VpcService) {}

  @Get()
  async getVPCInformation(
    @Query('regionName') regionName: string,
  ): Promise<VpcResponse> {
    const result = await this.vpcService.crawlInformation(regionName);
    return {
      data: result,
    };
  }

  @Get('/test')
  async getVPCInformationTest(@Query('regionName') regionName: string) {
    const result = await this.vpcService.crawlInformation(regionName);
    return {
      data: result,
    };
  }
}
