import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VpcService } from './vpc.service';
import { PostVpcRequestDTO } from './dto/vpc.dto.request';
@Controller('carrot/v1/vpc')
export class VpcController {
  constructor(private readonly vpcService: VpcService) {}
  @Post()
  async createVPCInformation(@Body() postVpcRequestDTO: PostVpcRequestDTO) {
    const { regionName, accessKeyId, secretAccessKey } = postVpcRequestDTO;
    const results = await this.vpcService.get(regionName, accessKeyId, secretAccessKey);
    await this.vpcService.create(results.vpcs);
    return results;
  }
}
