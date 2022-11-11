import { Body, Controller, Get, Post } from '@nestjs/common';
import { VpcService } from './vpc.service';
import { PostVpcRequestDTO } from './dto/vpc.dto.request';
@Controller('carrot/v1/vpc')
export class VpcController {
  constructor(private readonly vpcService: VpcService) {}
  @Post()
  async createVPCInformation(@Body() postVpcRequestDTO: PostVpcRequestDTO) {
    const { config, filter } = postVpcRequestDTO;
    console.log(postVpcRequestDTO);
    const results = await this.vpcService.getAWSResource(config, filter);
    await this.vpcService.saveAWSResource(results.vpcs, config.region);
    return results;
  }
}
