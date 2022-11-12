import { Body, Controller, Get, Post } from '@nestjs/common';
import { VpcService } from './vpc.service';
import { GetVpcRequestDTO, PostVpcRequestDTO } from './dto/vpc.dto.request';
import { GetVpcResponseDTO, PostVpcResponseDTO } from './dto/vpc.dto.response';
@Controller('carrot/v1/vpc')
export class VpcController {
  constructor(private readonly vpcService: VpcService) {}
  @Post()
  async createVPCInformation(@Body() postVpcRequestDTO: PostVpcRequestDTO): Promise<PostVpcResponseDTO> {
    const { config, filter } = postVpcRequestDTO;
    const results = await this.vpcService.getAWSResource(config, filter);
    await this.vpcService.saveAWSResource(results.vpcs, config.region);
    return {
      data: results,
    };
  }

  @Get()
  async getVPCInformation(@Body() getVpcRequestDTO: GetVpcRequestDTO): Promise<GetVpcResponseDTO> {
    const results = await this.vpcService.getDatabaseResource(getVpcRequestDTO);
    return {
      data: {
        vpcs: results,
      },
    };
  }
}
