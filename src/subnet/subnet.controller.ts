import { Body, Controller, Get, Param, Query, Res } from '@nestjs/common';
import { SubnetService } from './subnet.service';
import { PostSubnetRequestDTO } from './dto/subnet.dto.request';
@Controller('carrot/v1/subnet')
export class SubnetController {
  constructor(private readonly subnetService: SubnetService) {}

  async createSubnetInforamtion(@Body() postSubnetRequestDTO: PostSubnetRequestDTO) {
    const { regionName, accessKeyId, secretAccessKey } = postSubnetRequestDTO;
    const results = await this.subnetService.get(regionName, accessKeyId, secretAccessKey);
    await this.subnetService.create(results.subnets);
    return results;
  }
}
