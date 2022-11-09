import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { SubnetService } from './subnet.service';
import { PostSubnetRequestDTO } from './dto/subnet.dto.request';
@Controller('carrot/v1/subnet')
export class SubnetController {
  constructor(private readonly subnetService: SubnetService) {}

  @Post()
  async createSubnetInforamtion(@Body() postSubnetRequestDTO: PostSubnetRequestDTO) {
    const { config, filter } = postSubnetRequestDTO;
    const results = await this.subnetService.get(config, filter);
    await this.subnetService.create(results.subnets);
    return results;
  }
}
