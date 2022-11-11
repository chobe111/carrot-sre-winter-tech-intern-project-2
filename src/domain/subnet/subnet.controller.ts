import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubnetService } from './subnet.service';
import { GetSubnetRequestDTO, PostSubnetRequestDTO } from './dto/subnet.dto.request';
import { GetSubnetResponseDTO, PostSubnetResponseDTO } from './dto/subnet.dto.response';
@Controller('carrot/v1/subnet')
export class SubnetController {
  constructor(private readonly subnetService: SubnetService) {}

  @Post()
  async createSubnetInforamtion(@Body() postSubnetRequestDTO: PostSubnetRequestDTO): Promise<PostSubnetResponseDTO> {
    const { config, filter } = postSubnetRequestDTO;
    const results = await this.subnetService.getAWSResource(config, filter);
    await this.subnetService.saveAWSResource(results.subnets);
    return {
      data: results,
    };
  }

  @Get()
  async getSubnetInformation(@Body() getSubnetRequestDTO: GetSubnetRequestDTO): Promise<GetSubnetResponseDTO> {
    const subnets = await this.subnetService.getDatabaseResource(getSubnetRequestDTO);
    return {
      data: {
        subnets: subnets,
      },
    };
  }
}
